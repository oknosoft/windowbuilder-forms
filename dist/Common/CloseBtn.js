"use strict";

var _interopRequireDefault = require("D:\\WORK\\0KNOSOFT\\UniServer\\www\\builder2\\windowbuilder-forms\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CloseBtn;

var _react = _interopRequireDefault(require("react"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Close = _interopRequireDefault(require("@material-ui/icons/Close"));

var _Tip = _interopRequireDefault(require("./Tip"));

var _ref = /*#__PURE__*/_react.default.createElement(_Close.default, null);

function CloseBtn(props) {
  return /*#__PURE__*/_react.default.createElement(_Tip.default, {
    title: "Закрыть форму"
  }, /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    onClick: props.handleClose
  }, _ref));
}