function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
/**
 * PropField со связями параметров
 */

import React from 'react';
import PropTypes from 'prop-types';
import PropField from 'metadata-react/DataField/PropField';
export default function LinkedProp({
  _obj,
  _fld = 'value',
  param,
  fields,
  cnstr,
  inset,
  ...other
}) {
  if (!param) {
    param = _obj.param;
  }

  // вычисляемые скрываем всегда
  let hide = !param.show_calculated && param.is_calculated;

  // признак короткого списка
  const {
    types
  } = param.type;
  let oselect = types.length === 1 && ['cat.property_values', 'cat.characteristics'].includes(types[0]);
  const _meta = $p.utils._clone(fields[_fld]);
  _meta.synonym = param.caption || param.name;

  // учтём дискретный ряд - он приоритетнее связей параметров
  const drow = inset?.product_params?.find({
    param
  });
  if (drow) {
    if (!hide) {
      hide = hide.hide || _obj.hide;
    }
    if (drow?.list) {
      try {
        _meta.list = JSON.parse(drow.list);
        oselect = true;
      } catch (e) {
        delete _meta.list;
      }
    } else {
      delete _meta.list;
    }
  } else {
    // если нет умолчаний во вставке, используем связи
    const lnk_props = {
      obj: _obj
    };
    if (cnstr !== undefined) {
      lnk_props.grid = {
        selection: {
          cnstr,
          inset
        }
      };
    }
    const links = param.params_links(lnk_props);
    // если для параметра есть связи - сокрытие по связям
    if (!hide) {
      if (links.length) {
        hide = links.some(link => link.hide);
      } else {
        hide = _obj.hide;
      }
    }
    // дополним метаданные отбором
    if (links.length) {
      const values = [];
      param.linked_values(links, null, values);
      if (values.length) {
        if (values.length < 50) {
          oselect = true;
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
  if (typeof _obj.hide === 'boolean' && _obj.hide !== hide) {
    _obj.hide = hide;
  }
  return hide ? null : /*#__PURE__*/React.createElement(PropField, _extends({
    _obj: _obj,
    _fld: _fld,
    _meta: _meta,
    ctrl_type: oselect ? 'oselect' : void 0
  }, other));
}