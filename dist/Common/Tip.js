function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

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
  return /*#__PURE__*/React.createElement(Tooltip, _extends({
    title: title,
    classes: {
      tooltip: classes.tooltip
    },
    enterTouchDelay: 600,
    leaveTouchDelay: 2000
  }, others), /*#__PURE__*/React.createElement("span", null, children));
}

export default withStyles(styles)(Tip);