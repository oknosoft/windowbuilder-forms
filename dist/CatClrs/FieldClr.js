function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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