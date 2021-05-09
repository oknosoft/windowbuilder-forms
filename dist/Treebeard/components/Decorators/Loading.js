import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
const Loading = styled(({
  className
}) => /*#__PURE__*/React.createElement("div", {
  className: className
}, "loading..."))(({
  style
}) => style);
Loading.propTypes = {
  style: PropTypes.object
};
export default Loading;