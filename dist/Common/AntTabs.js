"use strict";

var _interopRequireDefault = require("D:\\WORK\\0KNOSOFT\\UniServer\\www\\builder2\\windowbuilder-forms\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tab = exports.Tabs = void 0;

var _styles = require("@material-ui/core/styles");

var _Tabs = _interopRequireDefault(require("@material-ui/core/Tabs"));

var _Tab = _interopRequireDefault(require("@material-ui/core/Tab"));

const Tabs = (0, _styles.withStyles)({
  root: {
    borderBottom: '1px solid #e8e8e8',
    marginBottom: 8
  }
})(_Tabs.default);
exports.Tabs = Tabs;
const Tab = (0, _styles.withStyles)({
  root: {
    fontSize: 'large',
    '@media (min-width: 600px)': {
      minWidth: 72
    }
  }
})(_Tab.default);
exports.Tab = Tab;