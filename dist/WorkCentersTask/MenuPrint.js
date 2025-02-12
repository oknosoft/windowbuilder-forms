var _IconPrint;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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