var _ArrowDropDownIcon, _ArrowDropDownIcon2;
import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import useStyles from './stylesAccordion';
export default function FieldSet({
  title = 'Группа',
  children
}) {
  const classes = useStyles();
  return /*#__PURE__*/React.createElement(Accordion, {
    square: true,
    elevation: 0,
    classes: {
      expanded: classes.rootExpanded
    },
    defaultExpanded: true
  }, /*#__PURE__*/React.createElement(AccordionSummary, {
    classes: {
      root: classes.summary,
      content: classes.summaryContent,
      expanded: classes.summaryExpanded,
      expandIcon: classes.icon
    },
    style: {
      backgroundColor: 'rgba(0, 0, 0, 0.12)'
    },
    expandIcon: _ArrowDropDownIcon || (_ArrowDropDownIcon = /*#__PURE__*/React.createElement(ArrowDropDownIcon, null))
  }, /*#__PURE__*/React.createElement(Input, {
    fullWidth: true,
    readOnly: true,
    value: title,
    endAdornment: /*#__PURE__*/React.createElement(InputAdornment, {
      position: "end",
      classes: {
        root: classes.input
      }
    }, _ArrowDropDownIcon2 || (_ArrowDropDownIcon2 = /*#__PURE__*/React.createElement(ArrowDropDownIcon, null)))
  })), /*#__PURE__*/React.createElement(AccordionDetails, {
    classes: {
      root: classes.details
    }
  }, children));
}
;