function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PropTypes from 'prop-types';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PropField from 'metadata-react/DataField/PropField';
import FieldInfinit from 'metadata-react/DataField/FieldInfinit/FieldAutocomplete';
import useStyles from '../Common/stylesAccordion';

var _ref = /*#__PURE__*/React.createElement(ArrowDropDownIcon, null);

var _ref2 = /*#__PURE__*/React.createElement(ArrowDropDownIcon, null);

export default function FieldClr({
  _meta,
  _obj,
  _fld,
  ...other
}) {
  if (_fld !== 'clr') {
    return /*#__PURE__*/React.createElement(FieldInfinit, _extends({
      _meta: _meta,
      _obj: _obj,
      _fld: _fld
    }, other));
  }

  const value = _obj[_fld];
  const classes = useStyles();
  const type = {
    is_ref: true,
    types: ['cat.clrs']
  };
  const meta_clr = Object.assign({}, _meta, {
    type,
    synonym: 'Основной'
  });
  const meta_in = Object.assign({}, _meta, {
    type,
    synonym: 'Изнутри'
  });
  const meta_out = Object.assign({}, _meta, {
    type,
    synonym: 'Снаружи'
  });
  return /*#__PURE__*/React.createElement(Accordion, {
    square: true,
    elevation: 0,
    classes: {
      expanded: classes.rootExpanded
    }
  }, /*#__PURE__*/React.createElement(AccordionSummary, {
    classes: {
      root: classes.summary,
      content: classes.summaryContent,
      expanded: classes.summaryExpanded,
      expandIcon: classes.icon
    },
    expandIcon: _ref
  }, /*#__PURE__*/React.createElement(FormControl, {
    classes: {
      root: classes.control
    }
  }, /*#__PURE__*/React.createElement(InputLabel, {
    classes: {
      shrink: classes.lshrink,
      formControl: classes.lformControl
    }
  }, "Цвет"), /*#__PURE__*/React.createElement(Input, {
    classes: {
      root: classes.iroot,
      input: classes.input
    },
    readOnly: true,
    value: value && value.name,
    endAdornment: /*#__PURE__*/React.createElement(InputAdornment, {
      position: "end",
      classes: {
        root: classes.input
      }
    }, _ref2)
  }))), /*#__PURE__*/React.createElement(AccordionDetails, {
    classes: {
      root: classes.details
    }
  }, /*#__PURE__*/React.createElement(PropField, _extends({
    _meta: meta_clr,
    _obj: _obj,
    _fld: "clr",
    ctrl_type: FieldInfinit
  }, other)), /*#__PURE__*/React.createElement(PropField, _extends({
    _meta: meta_in,
    _obj: _obj,
    _fld: "clr_in",
    ctrl_type: FieldInfinit
  }, other)), /*#__PURE__*/React.createElement(PropField, _extends({
    _meta: meta_out,
    _obj: _obj,
    _fld: "clr_out",
    ctrl_type: FieldInfinit
  }, other))));
}
;