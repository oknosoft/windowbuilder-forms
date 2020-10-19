function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from 'metadata-react/App/Dialog';
import ObjHistory from './ObjHistory';
export default function (props) {
  const {
    dialog: {
      _mgr,
      cmd,
      ref
    },
    handlers
  } = props;

  const obj = _mgr.get(ref);

  function handleCancel() {
    handlers.handleIfaceState({
      component: cmd.area || 'DataObjPage',
      name: 'dialog',
      value: null
    });
  }

  ;
  return /*#__PURE__*/React.createElement(Dialog, {
    open: true,
    initFullScreen: true,
    large: true,
    title: `История изменений '${obj}'`,
    onClose: handleCancel,
    actions: [/*#__PURE__*/React.createElement(Button, {
      key: "cancel",
      onClick: handleCancel,
      color: "primary"
    }, "Закрыть")]
  }, /*#__PURE__*/React.createElement(ObjHistory, _extends({
    obj: obj,
    _mgr: _mgr
  }, cmd)));
}