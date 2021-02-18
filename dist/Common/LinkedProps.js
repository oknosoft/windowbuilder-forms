/**
 * Табличная часть свойств со связями параметров
 *
 * @module LinkedProps
 *
 * Created by Evgeniy Malyarov on 09.03.2020.
 */
import React from 'react';
import PropTypes from 'prop-types';
import PropField from 'metadata-react/DataField/PropField';

class LinkedProps extends React.Component {
  render() {
    const {
      ts,
      cnstr,
      inset
    } = this.props;

    const {
      fields
    } = ts._owner._metadata(ts._name);

    const res = [];
    const grid = {
      selection: {
        cnstr,
        inset
      }
    };
    const notify = new Set();
    ts.find_rows({
      cnstr,
      inset,
      hide: false
    }, prow => {
      const {
        param
      } = prow;
      const links = param.params_links({
        grid,
        obj: prow
      }); // вычисляемые скрываем всегда

      let hide = !param.show_calculated && param.is_calculated; // если для параметра есть связи - сокрытие по связям

      if (!hide) {
        if (links.length) {
          hide = links.some(link => link.hide);
        } else {
          hide = prow.hide;
        }
      }

      const _meta = Object.assign({}, fields.value);

      _meta.synonym = param.caption || param.name;
      const {
        types
      } = param.type;
      let oselect = types.length === 1 && ['cat.property_values', 'cat.characteristics'].includes(types[0]);
      let key = `${prow.row}-${prow.param.valueOf()}`;

      if (ts._owner.sys) {
        key += ts._owner.sys.valueOf();
      } // проверим вхождение значения в доступные и при необходимости изменим


      if (links.length) {
        links.forEach(link => {
          key += link.valueOf();
        });
        const values = [];

        if (param.linked_values(links, prow, values)) {
          notify.add(prow);
        }

        if (values.length) {
          if (values.length < 50) {
            oselect = true;
          }

          if (!_meta.choice_params) {
            _meta.choice_params = [];
          } // дополняем отбор


          _meta.choice_params.push({
            name: 'ref',
            path: {
              in: values.map(v => v.value)
            }
          });
        }
      }

      if (prow.hide !== hide) {
        prow.hide = hide;
        notify.add(prow);
      }

      if (hide) {
        return;
      }

      res.push( /*#__PURE__*/React.createElement(PropField, {
        key: `prm-${$p.utils.crc32(key)}`,
        _obj: prow,
        _fld: "value",
        _meta: _meta,
        ctrl_type: oselect ? 'oselect' : void 0
      }));
    });
    return res;
  }

}

export default LinkedProps;