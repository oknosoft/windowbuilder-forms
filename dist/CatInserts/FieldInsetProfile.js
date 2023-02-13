function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
/**
 *
 *
 * @module FieldInsetProfile
 *
 * Created by Evgeniy Malyarov on 06.03.2022.
 */

import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import withStyles, { extClasses } from 'metadata-react/DataField/stylesPropertyGrid';
const _fld = 'inset';
const onKeyDown = evt => {
  const {
    key
  } = evt;
  if (['ArrowUp', 'ArrowDown'].includes(key)) {
    $p.ui.prevent(evt);
  }
};
function FieldInsetProfile({
  elm,
  classes,
  project,
  elm_type,
  onClick,
  disabled,
  ...props
}) {
  const ext = extClasses(classes);

  // получим список доступных
  const layer = elm?.layer || project?.activeLayer;
  if (!layer) {
    return null;
  }
  const {
    sys
  } = layer;
  const list = sys.inserts(elm_type || elm.elm_type, false, elm);
  const value = elm[_fld];
  let error = !list.includes(value);
  if (error) {
    list.push(value);
  }
  if (error && disabled) {
    error = false;
  }
  const synonym = `Вставка`;
  const onChange = (e, value) => {
    elm[_fld] = value;
  };
  return /*#__PURE__*/React.createElement(Autocomplete, {
    blurOnSelect: true,
    disableListWrap: true,
    disableClearable: true,
    disabled: disabled,
    options: list,
    value: value,
    getOptionLabel: v => v?.name || '',
    renderInput: ({
      inputProps,
      InputProps,
      InputLabelProps,
      id,
      ...other
    }) => /*#__PURE__*/React.createElement(FormControl, _extends({
      classes: ext.control,
      error: error,
      onClick: onClick,
      fullWidth: true
    }, other), /*#__PURE__*/React.createElement(InputLabel, _extends({
      classes: ext.label
    }, InputLabelProps), synonym), /*#__PURE__*/React.createElement(Input, _extends({
      classes: ext.input,
      inputProps: inputProps
    }, InputProps))),
    renderOption: option => /*#__PURE__*/React.createElement(Typography, {
      noWrap: true
    }, option.name),
    onChange: onChange,
    onKeyDown: onKeyDown
  });
}
export default withStyles(FieldInsetProfile);