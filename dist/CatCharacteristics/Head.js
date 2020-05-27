import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import DataField from 'metadata-react/DataField';
export default function Head({
  _obj,
  classes
}) {
  return [/*#__PURE__*/React.createElement(FormGroup, {
    row: true,
    key: "row0",
    className: classes.paddingBottom
  }, /*#__PURE__*/React.createElement(DataField, {
    _obj: _obj,
    _fld: "name"
  }), /*#__PURE__*/React.createElement(DataField, {
    _obj: _obj,
    _fld: "owner"
  }), /*#__PURE__*/React.createElement(DataField, {
    _obj: _obj,
    _fld: "note"
  })), /*#__PURE__*/React.createElement(FormGroup, {
    row: true,
    key: "row1",
    className: classes.paddingBottom
  }, /*#__PURE__*/React.createElement(DataField, {
    _obj: _obj,
    _fld: "clr"
  }), /*#__PURE__*/React.createElement(DataField, {
    _obj: _obj,
    _fld: "x"
  }), /*#__PURE__*/React.createElement(DataField, {
    _obj: _obj,
    _fld: "y"
  })), /*#__PURE__*/React.createElement(FormGroup, {
    row: true,
    key: "row2",
    className: classes.paddingBottom
  }, /*#__PURE__*/React.createElement(DataField, {
    _obj: _obj,
    _fld: "s"
  }), /*#__PURE__*/React.createElement(DataField, {
    _obj: _obj,
    _fld: "weight"
  }), /*#__PURE__*/React.createElement(DataField, {
    _obj: _obj,
    _fld: "z"
  })), /*#__PURE__*/React.createElement(FormGroup, {
    row: true,
    key: "row3",
    className: classes.paddingBottom
  }, /*#__PURE__*/React.createElement(DataField, {
    _obj: _obj,
    _fld: "calc_order",
    read_only: true
  }), /*#__PURE__*/React.createElement(DataField, {
    _obj: _obj,
    _fld: "department",
    read_only: true
  }), /*#__PURE__*/React.createElement(DataField, {
    _obj: _obj,
    _fld: "obj_delivery_state",
    read_only: true
  })), /*#__PURE__*/React.createElement(FormGroup, {
    row: true,
    key: "row4",
    className: classes.paddingBottom
  }, /*#__PURE__*/React.createElement(DataField, {
    _obj: _obj,
    _fld: "product",
    read_only: true
  }), /*#__PURE__*/React.createElement(DataField, {
    _obj: _obj,
    _fld: "leading_product",
    read_only: true
  }), /*#__PURE__*/React.createElement(DataField, {
    _obj: _obj,
    _fld: "origin",
    read_only: true
  }))];
}