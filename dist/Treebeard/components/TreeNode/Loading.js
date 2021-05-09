import React from 'react';
import PropTypes from 'prop-types';
import { Ul } from '../common';

const Loading = ({
  style,
  decorators
}) => /*#__PURE__*/React.createElement(Ul, {
  style: style.subtree
}, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(decorators.Loading, {
  style: style.loading
})));

export default Loading;