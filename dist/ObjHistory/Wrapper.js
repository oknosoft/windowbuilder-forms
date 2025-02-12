function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from 'metadata-react/App/Dialog';
import ObjHistory from './ObjHistory';
const defaultCloseText = 'Закрыть';
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
  const [close, setClose] = React.useState({
    handler: null,
    text: ''
  });
  const [toolbtns, setToolBtns] = React.useState(null);
  function handleCancel() {
    const stop = close.handler ? close.handler({
      _mgr,
      cmd,
      ref,
      handlers
    }) === false : false;
    !stop && handlers.handleIfaceState({
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
    toolbtns: toolbtns,
    actions: [/*#__PURE__*/React.createElement(Button, {
      key: "cancel",
      onClick: handleCancel,
      color: "primary"
    }, close.text || defaultCloseText)]
  }, /*#__PURE__*/React.createElement(ObjHistory, _extends({
    obj: obj,
    _mgr: _mgr
  }, cmd, {
    setClose: setClose,
    setToolBtns: setToolBtns
  })));
}