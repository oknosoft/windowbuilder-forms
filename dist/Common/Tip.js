"use strict";

var _interopRequireDefault = require("D:\\WORK\\0KNOSOFT\\UniServer\\www\\builder2\\windowbuilder-forms\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Tooltip = _interopRequireDefault(require("@material-ui/core/Tooltip"));

var _styles = require("@material-ui/core/styles");

const styles = ({
  typography
}) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: typography.pxToRem(12),
    fontWeight: 400,
    border: '1px solid #dadde9'
  }
});

function Tip({
  title,
  children,
  classes,
  ...others
}) {
  return /*#__PURE__*/_react.default.createElement(_Tooltip.default, Object.assign({
    title: title,
    classes: {
      tooltip: classes.tooltip
    },
    enterTouchDelay: 600,
    leaveTouchDelay: 2000
  }, others), /*#__PURE__*/_react.default.createElement("span", null, children));
}

var _default = (0, _styles.withStyles)(styles)(Tip);

exports.default = _default;