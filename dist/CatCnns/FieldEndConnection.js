/**
 * Концевые соединения профиля
 *
 * @module FieldCnn
 *
 * Created by Evgeniy Malyarov on 14.01.2022.
 */
import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import withStyles, { extClasses } from 'metadata-react/DataField/stylesPropertyGrid';
const {
  enm: {
    cnn_types: {
      acn
    }
  },
  utils
} = $p;
const compare = utils.sort('name');

function FieldEndConnection({
  elm1,
  elm2,
  node,
  _fld,
  classes,
  onClick,
  ...props
}) {
  const ext = extClasses(classes); // получим список доступных

  const cnn_point = elm1.rays[node];

  if (!elm2) {
    elm2 = cnn_point.profile;
  }

  if (!_fld) {
    _fld = node === 'b' ? 'cnn1' : 'cnn2';
  }

  const list = $p.cat.cnns.nom_cnn(elm1, elm2, elm2 ? acn.a : acn.i, false, undefined, cnn_point);
  const other = cnn_point.find_other();

  if (other && other.profile === elm2) {
    _fld += 'o';
  }

  const value = elm1[_fld];
  const error = !list.includes(value);

  if (error) {
    list.push(value);
  }

  list.sort(compare);
  const p2 = elm2 ? elm2.b.is_nearest(cnn_point.point, true) ? 'b' : elm2.e.is_nearest(cnn_point.point, true) ? 'e' : 't' : 'Пустота';
  const synonym = `Соедин ${elm1.elm}${node} -> ${elm2 ? elm2.elm : ''}${p2}`;

  const onChange = ({
    target
  }) => {
    elm1[_fld] = target.value;
  };

  return /*#__PURE__*/React.createElement(FormControl, {
    classes: ext.control,
    error: error,
    onClick: onClick,
    fullWidth: true
  }, /*#__PURE__*/React.createElement(InputLabel, {
    classes: ext.label
  }, synonym), /*#__PURE__*/React.createElement(Select, {
    value: value && value.valueOf(),
    onChange: onChange,
    input: /*#__PURE__*/React.createElement(Input, {
      classes: ext.input
    })
  }, list.map((v, i) => /*#__PURE__*/React.createElement(MenuItem, {
    key: `cn-${i}`,
    value: v.valueOf()
  }, /*#__PURE__*/React.createElement("div", {
    className: v.cnn_type.css
  }), v.toString()))));
}

export default withStyles(FieldEndConnection);