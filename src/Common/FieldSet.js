import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import useStyles from './stylesAccordion';

export default function FieldSet({title = 'Группа', children}) {
  const classes = useStyles();
  return <Accordion square elevation={0} classes={{expanded: classes.rootExpanded}} defaultExpanded>
    <AccordionSummary classes={{
      root: classes.summary,
      content: classes.summaryContent,
      expanded: classes.summaryExpanded,
      expandIcon: classes.icon,
    }} style={{backgroundColor: 'rgba(0, 0, 0, 0.12)'}} expandIcon={<ArrowDropDownIcon />}>
      <Input
        fullWidth
        readOnly
        value={title}
        endAdornment={<InputAdornment position="end" classes={{root: classes.input}}><ArrowDropDownIcon /></InputAdornment>}
      />
    </AccordionSummary>
    <AccordionDetails classes={{root: classes.details}}>
      {children}
    </AccordionDetails>
  </Accordion>
};
