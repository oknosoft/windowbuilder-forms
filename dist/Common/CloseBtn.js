import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Tip from './Tip';

var _ref = /*#__PURE__*/React.createElement(CloseIcon, null);

export default function CloseBtn(props) {
  return /*#__PURE__*/React.createElement(Tip, {
    title: "Закрыть форму"
  }, /*#__PURE__*/React.createElement(IconButton, {
    onClick: props.handleClose
  }, _ref));
}