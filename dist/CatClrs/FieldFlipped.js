var _MenuItem, _MenuItem2, _MenuItem3;
/**
 * Поле ввода перевёрнутости слоя
 */

import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import withStyles, { extClasses } from 'metadata-react/DataField/stylesPropertyGrid';
function FieldFlipped({
  classes,
  _obj,
  _fld,
  _meta,
  onClick,
  ...props
}) {
  const ext = extClasses(classes);
  _fld = 'flipped';
  const onChange = ({
    target
  }) => {
    _obj[_fld] = target.value;
  };
  return /*#__PURE__*/React.createElement(FormControl, {
    classes: ext.control,
    onClick: onClick,
    fullWidth: true
  }, /*#__PURE__*/React.createElement(InputLabel, {
    classes: ext.label
  }, "Перевёрнутость"), /*#__PURE__*/React.createElement(Select, {
    value: _obj._row?.[_fld] || 0,
    onChange: onChange,
    input: /*#__PURE__*/React.createElement(Input, {
      classes: ext.input
    })
  }, _MenuItem || (_MenuItem = /*#__PURE__*/React.createElement(MenuItem, {
    value: 0
  }, "Авто")), _MenuItem2 || (_MenuItem2 = /*#__PURE__*/React.createElement(MenuItem, {
    value: 1
  }, "Перевёрнут")), _MenuItem3 || (_MenuItem3 = /*#__PURE__*/React.createElement(MenuItem, {
    value: -1
  }, "Обычный"))));
}
export default withStyles(FieldFlipped);