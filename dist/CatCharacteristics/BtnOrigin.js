import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FindIcon from '@material-ui/icons/FindInPage';
import Tip from '../Common/Tip';
const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: theme.spacing(1)
  }
}));

var _ref = /*#__PURE__*/React.createElement(FindIcon, null);

export default function BtnOrigin(props) {
  const classes = useStyles();
  return /*#__PURE__*/React.createElement(Tip, {
    title: "Показать элемент технологического справочника"
  }, /*#__PURE__*/React.createElement(Button, {
    classes: classes,
    variant: "contained" //color="primary"
    ,
    startIcon: _ref,
    onClick: props.handleOpen
  }, "Происхождение"));
}