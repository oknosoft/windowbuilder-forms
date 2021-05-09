import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import {Div} from '../common';

const Polygon = styled('polygon', {
    shouldForwardProp: prop => ['className', 'children', 'points'].indexOf(prop) !== -1
})((({style}) => style));

const Toggle = ({style, node, onClick}) => {
  const height = style.height;
  const width = style.width;
  let r = (height - 4) / 2;
  let path = `M${r / 2},${r * 1.5}a${r},${r} 0 1,0 ${r * 2},0a${r},${r} 0 1,0 -${r * 2},0`;
  if (node.toggled === true)
    path += `M${r * 1.5},${r}l0,${r}`;
  else
    path += `M${r},${r * 1.5}l${r},0M${r * 1.5},${r}l0,${r}`;

  return (
    <div style={style.base} onClick={() => onClick()}>
      <div style={style.wrapper}>
        <svg height={height} width={width}>
          <path d={path} fill="none" stroke="black"></path>
        </svg>
      </div>
    </div>
  );
};

Toggle.propTypes = {
    style: PropTypes.object,
    onClick: PropTypes.func,
};

export default Toggle;
