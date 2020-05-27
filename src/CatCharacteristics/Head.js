
import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import DataField from 'metadata-react/DataField';

export default function Head({_obj, classes}) {
  return [
    <FormGroup row key="row0" className={classes.paddingBottom}>
      <DataField _obj={_obj} _fld="name"/>
      <DataField _obj={_obj} _fld="owner"/>
      <DataField _obj={_obj} _fld="note"/>
    </FormGroup>,
    <FormGroup row key="row1" className={classes.paddingBottom}>
      <DataField _obj={_obj} _fld="clr"/>
      <DataField _obj={_obj} _fld="x"/>
      <DataField _obj={_obj} _fld="y"/>
    </FormGroup>,
    <FormGroup row key="row2" className={classes.paddingBottom}>
      <DataField _obj={_obj} _fld="s"/>
      <DataField _obj={_obj} _fld="weight"/>
      <DataField _obj={_obj} _fld="z"/>
    </FormGroup>,
    <FormGroup row key="row3" className={classes.paddingBottom}>
      <DataField _obj={_obj} _fld="calc_order" read_only/>
      <DataField _obj={_obj} _fld="department" read_only/>
      <DataField _obj={_obj} _fld="obj_delivery_state" read_only/>
    </FormGroup>,
    <FormGroup row key="row4" className={classes.paddingBottom}>
      <DataField _obj={_obj} _fld="product" read_only/>
      <DataField _obj={_obj} _fld="leading_product" read_only/>
      <DataField _obj={_obj} _fld="origin" read_only/>
    </FormGroup>,
  ];
}
