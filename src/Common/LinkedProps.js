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

export default function LinkedProps({ts, cnstr, inset, layer, project}) {
  const {_owner} = ts;
  const {fields} = _owner._metadata(ts._name);
  const res = [];
  const grid = {selection: {cnstr, inset}};
  const notify = new Set();
  const sys = layer ? layer.sys : _owner.sys;
  const is_template = _owner?.calc_order?.obj_delivery_state?.is('Шаблон');

  const {utils, job_prm: {properties}} = $p;

  ts.find_rows({cnstr, inset, hide: false}, (prow) => {
    const {param} = prow;

    if(param === properties.auto_align && (cnstr || !is_template)) {
      return;
    }

    const _meta = utils._clone(fields.value);
    _meta.synonym = param.name || param.caption;
    if(param.mandatory) {
      _meta.mandatory = true;
    }

    const {types} = param.type;
    const stub = {
      prow,
      meta: _meta,
      oselect: types.length === 1 && ['cat.property_values', 'cat.characteristics'].includes(types[0]),
    }
    const bool = types.includes('boolean') && (typeof prow.value === 'boolean' || types.length === 1);
    let key = `${prow.row}-${prow.param.valueOf()}`;
    if(sys) {
      key += sys.valueOf();
    }

    let hide = false;

    if(!(project || layer).params_links(stub)) {

      const links = param.params_links({grid, obj: prow, layer});
      // вычисляемые скрываем всегда
      hide = !param.show_calculated && param.is_calculated;
      // если для параметра есть связи - сокрытие по связям
      if(!hide){
        if(links.length) {
          hide = links.some((link) => link.hide);
        }
        else {
          hide = prow.hide;
        }
      }

      // проверим вхождение значения в доступные и при необходимости изменим
      if (links.length) {
        links.forEach((link) => {
          key += link.valueOf();
        });
        const values = [];
        if(param.linked_values(links, prow, values)) {
          notify.add(prow);
        }
        if(!bool && values.length) {
          if(values.length < 50) {
            stub.oselect = true;
          }
          if(!_meta.choice_params) {
            _meta.choice_params = [];
          }
          // дополняем отбор
          _meta.choice_params.push({
            name: 'ref',
            path: {in: values.map((v) => v.value)}
          });
        }
      }
    }

    if (prow.hide !== hide) {
      prow.hide = hide;
      notify.add(prow);
    }
    if(hide) {
      return;
    }

    res.push({
      key,
      prow,
      _meta,
      ctrl_type: stub.oselect ? 'oselect' : (bool ? 'ch' : void 0),
      sorting_field: param.sorting_field,
    });
  });

  return res.sort(utils.sort('sorting_field'))
    .map(({key, prow, _meta, ctrl_type}) => <PropField
      key={`prm-${utils.crc32(key)}`}
      _obj={prow}
      _fld="value"
      _meta={_meta}
      ctrl_type={ctrl_type}
    />);
}

LinkedProps.propTypes = {
  ts: PropTypes.object.isRequired,
  cnstr: PropTypes.number,
  inset: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  layer: PropTypes.object,
  project: PropTypes.project,
};
