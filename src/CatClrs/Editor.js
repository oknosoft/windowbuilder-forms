
import React from 'react';
import PropTypes from 'prop-types';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PropField from 'metadata-react/DataField/PropField';
import FieldInfinit from 'metadata-react/DataField/FieldInfinit/FieldAutocomplete';
import useStyles from '../Common/stylesAccordion';

export default function FieldClr({_meta, _obj, _fld, ...other}) {

  if(_fld !== 'clr' || _meta.hide_composite) {
    return <FieldInfinit _meta={_meta} _obj={_obj} _fld={_fld} {...other}/>;
  }

  const value = _obj[_fld];
  const classes = useStyles();
  const type = {is_ref: true, types: ['cat.clrs']};
  const meta_clr = Object.assign({}, _meta, {type, synonym: 'Общий'});
  const meta_in = Object.assign({}, _meta, {type, synonym: 'Изнутри'});
  const meta_out = Object.assign({}, _meta, {type, synonym: 'Снаружи'});
  $p.cat.clrs.hide_composite(meta_in);
  $p.cat.clrs.hide_composite(meta_out);

  return <Accordion square elevation={0} classes={{expanded: classes.rootExpanded}}>
    <AccordionSummary classes={{
      root: classes.summary,
      content: classes.summaryContent,
      expanded: classes.summaryExpanded,
      expandIcon: classes.icon,
    }} expandIcon={<ArrowDropDownIcon />}>
      <FormControl classes={{root: classes.control}}>
        <InputLabel classes={{shrink: classes.lshrink, formControl: classes.lformControl}}>
          Цвет
        </InputLabel>
        <Input
          classes={{root: classes.iroot, input: classes.input}}
          readOnly
          value={value && value.name}
          endAdornment={<InputAdornment position="end" classes={{root: classes.input}}>
            <ArrowDropDownIcon />
          </InputAdornment>}
        />
      </FormControl>
    </AccordionSummary>
    <AccordionDetails classes={{root: classes.details}}>
      <PropField _meta={meta_clr} _obj={_obj} _fld="clr" ctrl_type={FieldInfinit} {...other}/>
      <PropField _meta={meta_in} _obj={_obj} _fld="clr_in" ctrl_type={FieldInfinit} {...other}/>
      <PropField _meta={meta_out} _obj={_obj} _fld="clr_out" ctrl_type={FieldInfinit} {...other}/>
    </AccordionDetails>
  </Accordion>;

};

FieldClr.propTypes = {
  _meta: PropTypes.object.isRequired,
  _obj: PropTypes.object.isRequired,
  _fld: PropTypes.string.isRequired,
};
