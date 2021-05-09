import React from 'react';
import PropTypes from 'prop-types';

function prevent(e) {
  e.preventDefault();
}

const Header = ({
  node,
  style,
  onClick,
  onRightClick
}) => /*#__PURE__*/React.createElement("div", {
  style: node.children ? style.base : Object.assign({
    marginLeft: 16
  }, style.base),
  onClick: onClick,
  onContextMenu: e => {
    if (onRightClick && e.button === 2) {
      prevent(e);
      onRightClick(node, e);
    }
  } // onMouseUp={prevent}
  // onMouseDown={prevent}

}, /*#__PURE__*/React.createElement("div", {
  style: style.title,
  className: `dsn-hover`
}, /*#__PURE__*/React.createElement("div", {
  className: `dsn-treeview-icon ${node.icon}`
}), node.name));

export default Header;