import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import { makeStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import Tip from '../../Common/Tip';
import Params from './Params';
const useStyles = makeStyles(theme => ({
  paper: {
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper
  }
}));

var _ref = /*#__PURE__*/React.createElement("i", {
  className: "fa fa-filter fa-fw"
});

export default function QuickFilter({
  scheme,
  handleFilterChange
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'popper-filter' : undefined;

  const handleClick = event => {
    if (anchorEl) {
      setAnchorEl(null);
      handleFilterChange();
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const classes = useStyles();
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Tip, {
    title: "Быстрый фильтр>"
  }, /*#__PURE__*/React.createElement(IconButton, {
    "aria-describedby": id,
    onClick: handleClick
  }, _ref)), /*#__PURE__*/React.createElement(Popper, {
    id: id,
    open: open,
    anchorEl: anchorEl,
    placement: "bottom-start",
    onClose: handleClick,
    style: {
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: classes.paper
  }, /*#__PURE__*/React.createElement(Params, {
    scheme: scheme,
    handleFilterChange: handleFilterChange
  }), /*#__PURE__*/React.createElement(DialogActions, null, /*#__PURE__*/React.createElement(Button, {
    variant: "contained",
    onClick: handleClick,
    color: "primary"
  }, "Применить")))));
}