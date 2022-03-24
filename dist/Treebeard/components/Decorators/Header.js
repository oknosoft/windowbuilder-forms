import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  root: {
    padding: 0
  }
});

function prevent(e) {
  e.preventDefault();
}

const Header = ({
  node,
  style,
  onClick,
  onClickCheck,
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
}, node.hasOwnProperty('checked') ? /*#__PURE__*/React.createElement(Checkbox, {
  checked: node.checked,
  size: "small",
  color: "primary",
  onChange: ({
    target
  }) => {
    node.checked = target.checked;
    onClickCheck(node);
  },
  classes: useStyles()
}) : /*#__PURE__*/React.createElement("div", {
  className: `dsn-treeview-icon ${node.icon}`
}), node.name));

export default Header;