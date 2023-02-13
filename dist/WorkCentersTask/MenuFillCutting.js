var _IconFill;
import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconFill from '@material-ui/icons/FormatColorFill';
class MenuFillCutting extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      anchorEl: null
    };
    this.handleClick = event => {
      this.setState({
        anchorEl: event.currentTarget
      });
    };
    this.handleClose = () => {
      this.setState({
        anchorEl: null
      });
    };
    this.handleFill1D = () => {
      this.props.handleFillCutting({
        linear: true
      });
      this.handleClose();
    };
    this.handleFill1DClr = () => {
      this.props.handleFillCutting({
        linear: true,
        clr_only: true
      });
      this.handleClose();
    };
    this.handleFill2D = () => {
      this.props.handleFillCutting({
        bilinear: true
      });
      this.handleClose();
    };
    this.handleFillAll = () => {
      this.props.handleFillCutting({
        bilinear: true,
        linear: true
      });
      this.handleClose();
    };
  }
  render() {
    const {
      anchorEl
    } = this.state;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(IconButton, {
      "aria-haspopup": "true",
      title: "Заполнить",
      onClick: this.handleClick
    }, _IconFill || (_IconFill = /*#__PURE__*/React.createElement(IconFill, null))), /*#__PURE__*/React.createElement(Menu, {
      anchorEl: anchorEl,
      open: Boolean(anchorEl),
      onClose: this.handleClose
    }, /*#__PURE__*/React.createElement(MenuItem, {
      onClick: this.handleFill1D
    }, "Линейный"), /*#__PURE__*/React.createElement(MenuItem, {
      onClick: this.handleFill1DClr
    }, "Линейный (только цвет)"), /*#__PURE__*/React.createElement(MenuItem, {
      onClick: this.handleFill2D
    }, "Двумерный"), /*#__PURE__*/React.createElement(MenuItem, {
      onClick: this.handleFillAll
    }, "Все виды")));
  }
}
export default MenuFillCutting;