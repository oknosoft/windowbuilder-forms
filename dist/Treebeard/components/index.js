import React from 'react';
import PropTypes from 'prop-types';
import { castArray } from 'lodash';
import defaultTheme from '../themes/default';
import defaultAnimations from '../themes/animations';
import { Ul } from './common';
import defaultDecorators from './Decorators';
import TreeNode from './TreeNode';

const TreeBeard = props => {
  const {
    animations,
    decorators,
    data,
    separateToggleEvent,
    onToggle,
    onClickHeader,
    onRightClickHeader,
    style
  } = props;
  const nodeStyle = { ...defaultTheme.tree.node,
    ...style.tree.node
  };
  return /*#__PURE__*/React.createElement(Ul, {
    style: { ...defaultTheme.tree.base,
      ...style.tree.base
    }
  }, castArray(data).map((node, index) => /*#__PURE__*/React.createElement(TreeNode, {
    decorators,
    node,
    separateToggleEvent,
    onToggle,
    onClickHeader,
    onRightClickHeader,
    animations,
    key: node.id || index,
    style: nodeStyle
  })));
};

TreeBeard.defaultProps = {
  style: defaultTheme,
  animations: defaultAnimations,
  decorators: defaultDecorators
};
export default TreeBeard;