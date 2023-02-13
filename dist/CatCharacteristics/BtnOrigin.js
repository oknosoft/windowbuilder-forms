var _FindIcon;
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FindIcon from '@material-ui/icons/FindInPage';
import Tip from 'metadata-react/App/Tip';
const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: theme.spacing(1)
  }
}));
export default function BtnOrigin(props) {
  const classes = useStyles();
  return /*#__PURE__*/React.createElement(Tip, {
    title: "Показать элемент технологического справочника"
  }, /*#__PURE__*/React.createElement(Button, {
    classes: classes,
    variant: "contained"
    //color="primary"
    ,
    startIcon: _FindIcon || (_FindIcon = /*#__PURE__*/React.createElement(FindIcon, null)),
    onClick: props.handleOpen
  }, "Происхождение"));
}