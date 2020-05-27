function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import TabularSection from 'metadata-react/TabularSection';
import withAutoHeight from 'metadata-react/App/AutoHeight';
import Head from './Head';
import Glasses from './Glasses';
import Spec from './Spec';

function Tabular({
  _obj,
  schemas,
  name,
  ...others
}) {
  return /*#__PURE__*/React.createElement(TabularSection, _extends({
    key: `ts_${name}`,
    _obj: _obj,
    _tabular: name,
    scheme: schemas[name],
    denyAddDel: true,
    denyReorder: true
  }, others));
}

function TabContent({
  tab,
  _obj,
  classes,
  schemas,
  autoHeight
}) {
  switch (tab) {
    case 0:
      return /*#__PURE__*/React.createElement(Head, {
        _obj: _obj,
        classes: classes
      });

    case 1:
      return /*#__PURE__*/React.createElement(Tabular, {
        _obj: _obj,
        schemas: schemas,
        name: "params"
      });

    case 2:
      return /*#__PURE__*/React.createElement(Spec, {
        _obj: _obj,
        scheme: schemas.specification
      });

    case 3:
      return /*#__PURE__*/React.createElement(Tabular, {
        _obj: _obj,
        schemas: schemas,
        name: "constructions"
      });

    case 4:
      return /*#__PURE__*/React.createElement(Tabular, {
        _obj: _obj,
        schemas: schemas,
        name: "coordinates"
      });

    case 5:
      return /*#__PURE__*/React.createElement(Tabular, {
        _obj: _obj,
        schemas: schemas,
        name: "cnn_elmnts"
      });

    case 6:
      return /*#__PURE__*/React.createElement(Glasses, {
        _obj: _obj,
        schemas: schemas,
        autoHeight: autoHeight
      });

    case 7:
      return /*#__PURE__*/React.createElement(Tabular, {
        _obj: _obj,
        schemas: schemas,
        name: "inserts"
      });
  }
}

export default withAutoHeight(TabContent);