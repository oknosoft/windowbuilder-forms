/**
 * Табличная часть свойств со связями параметров
 *
 * @module LinkedProps
 *
 * Created 09.03.2020.
 */

import React from 'react';
import PropTypes from 'prop-types';
import PropField from 'metadata-react/DataField/PropField';
import CssField from './CssField';
import FieldSet from './FieldSet';
class FakePrmRow {
  constructor(raw) {
    this._raw = raw; //{ts, cnstr, param, inset, value};
    this._rows = [];
  }
  add(row) {
    if (!this._rows.includes(row)) {
      this._rows.push(row);
    }
  }
  isDiff() {
    const {
      _raw: {
        cnstr,
        value
      },
      _rows
    } = this;
    const row0 = _rows.find(v => v.cnstr === 0);
    return cnstr && row0 && row0.value != value;
  }
  get _owner() {
    return this._raw.ts;
  }
  get _row() {
    return this._rows[0];
  }
  get row() {
    return this._raw.cnstr || this._raw.inset?.valueOf() || 0;
  }
  get hide() {
    return false;
  }
  set hide(v) {}
  get cnstr() {
    return this._raw.cnstr;
  }
  get param() {
    return this._raw.param;
  }
  get sorting_field() {
    return this._raw.param.sorting_field;
  }
  get value() {
    return this._raw.value;
  }
  set value(v) {
    const {
      _raw: {
        cnstr,
        param,
        inset,
        ts
      },
      _rows
    } = this;
    const row0 = ts.params?.find?.({
      cnstr: 0,
      param
    }) || _rows.find(v => v.cnstr === 0);
    const value = this._raw.param.fetch_type(v);
    if (this._raw.cnstr) {
      let rowc = _rows.find(v => v.cnstr === cnstr);
      if (value == row0?.value) {
        // если значение в слое равно значению в изделии
        if (row0) {
          if (rowc) {
            _rows.splice(_rows.indexOf(rowc), 1);
            ts.del(rowc);
          }
        }
      } else {
        if (!rowc) {
          rowc = ts.add({
            cnstr,
            param,
            inset
          });
          _rows.push(rowc);
        }
        rowc.value = value;
      }
    } else if (row0) {
      row0.value = value;
    }
    this._raw.value = value;
  }
  get is_tabular() {
    return true;
  }
}
function groupedRows({
  ts,
  cnstr,
  inset,
  layer,
  sys
}) {
  const raw = new Map();
  const aprm = layer?.furn_set?.used_params();
  ts.find_rows({
    cnstr,
    inset,
    hide: false
  }, prow => {
    const {
      param
    } = prow;
    if (!raw.has(param)) {
      raw.set(param, new FakePrmRow({
        ts,
        cnstr,
        param,
        inset,
        value: prow.value
      }));
    }
    raw.get(param).add(prow);
  });
  if (aprm) {
    for (const param of aprm) {
      const topRow = ts.find({
        cnstr: 0,
        param,
        inset,
        hide: false
      });
      if (topRow) {
        if (!raw.has(param)) {
          raw.set(param, new FakePrmRow({
            ts,
            cnstr,
            param,
            value: topRow.value
          }));
        }
        raw.get(param)?.add(topRow);
      }
    }
  }
  const grouped = [];
  const {
    job_prm: {
      lists: {
        sys_prm_grp_names
      }
    },
    utils
  } = $p;
  for (const [param, prow] of raw) {
    let grp = 0;
    if (sys_prm_grp_names?.length && sys) {
      const row = sys.product_params.find({
        param
      }) || sys.furn_params.find({
        param
      });
      if (row) {
        grp = row.grouping;
      }
    }
    if (!grouped[grp]) {
      grouped[grp] = {
        name: sys_prm_grp_names?.[grp - 1] || '',
        rows: []
      };
    }
    grouped[grp].rows.push(prow);
  }
  const sort = utils.sort('sorting_field');
  for (const elm of grouped) {
    elm?.rows?.sort?.(sort);
  }
  return grouped.filter(v => v?.rows);
}
function children({
  rows,
  layer,
  project,
  fields,
  sys,
  grid,
  _owner
}) {
  const {
    utils,
    job_prm: {
      properties,
      builder
    }
  } = $p;
  const res = [];
  const notify = new Set();
  const is_template = _owner?.calc_order?.obj_delivery_state?.is('Шаблон');
  for (const prow of rows) {
    const {
      param
    } = prow;
    if (param === properties.auto_align && (grid.selection.cnstr || !is_template)) {
      continue;
    }
    const _meta = utils._clone(fields.value);
    _meta.synonym = `${prow.isDiff() ? '* ' : ''}${param.name || param.caption}`;
    _meta.type = param.type;
    const {
      types
    } = param.type;
    const stub = {
      prow,
      meta: _meta,
      oselect: types.length === 1 && ['cat.property_values', 'cat.characteristics'].includes(types[0])
    };
    const bool = types.includes('boolean') && (typeof prow.value === 'boolean' || types.length === 1);
    let key = `${prow.row}-${prow.param.valueOf()}`;
    if (sys) {
      key += sys.valueOf();
    }

    // вычисляемые скрываем всегда
    let hide = !param.show_calculated && param.is_calculated;
    if (!builder.ign_tech_restrictions) {
      const values = [];
      if (!(project || layer).params_links(stub)) {
        const links = param.params_links({
          grid,
          obj: prow,
          layer
        });
        // если для параметра есть связи - сокрытие по связям
        if (!hide) {
          if (links.length) {
            hide = links.some(link => link.hide);
          } else {
            hide = prow.hide;
          }
        }

        // проверим вхождение значения в доступные и при необходимости изменим
        if (links.length) {
          links.forEach(link => {
            key += link.valueOf();
          });
          if (param.linked_values(links, prow, values)) {
            notify.add(prow);
          }
          if (!bool && values.length) {
            if (values.length < 50) {
              stub.oselect = true;
            }
            if (!_meta.choice_params) {
              _meta.choice_params = [];
            }
            // дополняем отбор
            _meta.choice_params.push({
              name: 'ref',
              path: {
                in: values.map(v => v.value)
              }
            });
          }
        }
      }
      if (values.some(v => v.value.css)) {
        stub.cssselect = values.map(v => v.value);
      }
      if (prow.hide !== hide) {
        prow.hide = hide;
        notify.add(prow);
      }
    }
    if (prow.hide || hide) {
      continue;
    }
    const elm = {
      key,
      prow,
      _meta,
      ctrl_type: stub.oselect ? 'oselect' : bool ? 'ch' : void 0,
      cssselect: stub.cssselect
    };
    if (param.inheritance === 5) {
      elm.read_only = !_owner.obj_delivery_state?.is('Шаблон');
    }
    res.push(elm);
  }
  return res.map(({
    key,
    prow,
    _meta,
    ctrl_type,
    cssselect,
    read_only
  }) => cssselect ? /*#__PURE__*/React.createElement(PropField, {
    key: `prm-${utils.crc32(key)}`,
    _obj: prow,
    _fld: "value",
    _meta: _meta,
    read_only: read_only,
    options: cssselect,
    Component: CssField
  }) : /*#__PURE__*/React.createElement(PropField, {
    key: `prm-${utils.crc32(key)}`,
    _obj: prow,
    _fld: "value",
    _meta: _meta,
    read_only: read_only,
    ctrl_type: ctrl_type
  }));
}
export default function LinkedProps({
  ts,
  cnstr,
  inset,
  layer,
  project
}) {
  const {
    _owner
  } = ts;
  const {
    fields
  } = _owner._metadata(ts._name);
  const sys = layer ? layer.sys : _owner.sys;
  const grid = {
    selection: {
      cnstr,
      inset
    }
  };

  // подготовим массив свойств
  const grouped = groupedRows({
    ts,
    cnstr,
    inset,
    layer,
    sys
  });
  if (!grouped.length) {
    return null;
  } else if (grouped.length === 1) {
    return children({
      rows: grouped[0].rows,
      layer,
      project,
      fields,
      sys,
      grid,
      _owner
    });
  } else {
    return grouped.map(({
      name,
      rows
    }, index) => {
      const elements = children({
        rows,
        layer,
        project,
        fields,
        sys,
        grid,
        _owner
      });
      return name ? /*#__PURE__*/React.createElement(FieldSet, {
        key: `grp-${index}`,
        title: name
      }, elements) : elements;
    });
  }
}