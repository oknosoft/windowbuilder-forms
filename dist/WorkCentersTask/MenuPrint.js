var _IconPrint;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconPrint from '@material-ui/icons/Print';
//import IconClose from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Report1D from './Report1D';
function Transition(props) {
  return /*#__PURE__*/React.createElement(Slide, _extends({
    direction: "up"
  }, props));
}
class MenuPrint extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      anchorEl: null,
      mode: ''
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
    this.handleCloseDialog = () => {
      this.setState({
        mode: ''
      });
    };
    this.handle1D = () => {
      this.setState({
        mode: '1D',
        anchorEl: null
      });
    };
    this.handle2D = () => {
      this.setState({
        mode: '2D',
        anchorEl: null
      });
    };
  }
  render() {
    const {
      anchorEl,
      mode
    } = this.state;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(IconButton, {
      "aria-haspopup": "true",
      title: "Печать",
      onClick: this.handleClick
    }, _IconPrint || (_IconPrint = /*#__PURE__*/React.createElement(IconPrint, null))), /*#__PURE__*/React.createElement(Menu, {
      anchorEl: anchorEl,
      open: Boolean(anchorEl),
      onClose: this.handleClose
    }, /*#__PURE__*/React.createElement(MenuItem, {
      onClick: this.handle1D
    }, "Линейный"), /*#__PURE__*/React.createElement(MenuItem, {
      onClick: this.handle2D
    }, "Двумерный")), /*#__PURE__*/React.createElement(Dialog, {
      fullScreen: true,
      open: Boolean(mode),
      onClose: this.handleCloseDialog,
      TransitionComponent: Transition
    }, /*#__PURE__*/React.createElement(Report1D, this.props)));
  }
}
export default MenuPrint;