function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
import PropTypes from 'prop-types';
import DataField from './Editor';
import withStyles, { extClasses } from 'metadata-react/DataField/stylesPropertyGrid';
function FieldClr({
  classes,
  ...props
}) {
  return /*#__PURE__*/React.createElement(DataField, _extends({
    extClasses: extClasses(classes),
    fullWidth: true,
    isTabular: false
  }, props));
}
export default withStyles(FieldClr);