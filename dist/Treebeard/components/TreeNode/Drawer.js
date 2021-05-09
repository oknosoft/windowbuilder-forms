import React from 'react';
import PropTypes from 'prop-types';
import { VelocityTransitionGroup } from 'velocity-react';

const Drawer = ({
  restAnimationInfo,
  children
}) => /*#__PURE__*/React.createElement(VelocityTransitionGroup, restAnimationInfo, children);

export default Drawer;