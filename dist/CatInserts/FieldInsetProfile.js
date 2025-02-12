function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
  project,
  classes,
  elm_type,
  onClick,
  disabled,
  ...props
}) {
  const ext = extClasses(classes);

  // получим список доступных
  const elayer = elm?.layer;
  const layer = elayer || project?.activeLayer;
  if (!layer) {
    return null;
  }
  const {
    sys
  } = layer;
  const list = sys.inserts(elm_type || elm.elm_type, false, elayer ? elm : {
    layer,
    project,
    ox: project.ox
  });
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