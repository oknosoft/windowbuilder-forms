/**
 * Поле выбора с визуализацей
 *
 * @module CssField
 *
 * Created 27.05.2023.
 */

import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';

import {suggestionText} from 'metadata-react/DataField/AbstractField';
import withStyles from 'metadata-react/DataField/styles';

function typedValue({_obj, _fld, _meta}) {
  let v;
  const {is_ref, types} = _meta.type;
  if(is_ref && types.length === 1 && _obj._obj && _obj._obj.hasOwnProperty(_fld)) {
    v = $p.md.mgr_by_class_name(types[0]).get(_obj._obj[_fld]);
  }
  else {
    v = _obj[_fld];
  }
  return v;
}

function CssField(props) {

  const {classes, extClasses, _meta, fullWidth, read_only, disabled, options, get_ref, empty_text, ...other} = props;
  const value = typedValue(props);
  const attr = {
    title: _meta.tooltip || _meta.synonym,
  }
  if(_meta.mandatory && (!value || value.empty())) {
    attr.error = true;
  }
  if(read_only || disabled) {
    other.disabled = true;
  }

  const [selected, setSelected] = React.useState(null);

  const selectChange = ({target}) => {
    other._obj[other._fld] = target.value;
    setTimeout(() => {
      try{setSelected(null);}
      catch (e) {}
    }, 300);
  };

  const optionEnter = ({target}) => {
    const {types} = _meta.type;
    const {job_prm, md} = $p;
    const v = md.mgr_by_class_name(types[0])?.get(target.dataset.value);
    if(v?.css) {
      let css = v.css, style;
      if(!css.startsWith('art-')) {
        style = {backgroundImage: `url(${job_prm.builder.imgs_catalog_url + css})`}
        css = 'art-';
      }
      setSelected({css, style, target});
    }
  };

  const optionLeave = ({target}) => {
    setSelected(null);
  }



  return <FormControl
    classes={extClasses?.control}
    fullWidth={fullWidth}
    {...attr}
  >
    <InputLabel classes={extClasses?.label ? extClasses.label : null}>{_meta.synonym}</InputLabel>
    {selected && <Popper open anchorEl={selected.target} placement="left">
      <div className={selected.css} style={selected.style} />
    </Popper>}
    <Select
      value={value?.valueOf()}
      onChange={selectChange}
      onClose={optionLeave}
      input={<Input classes={Object.assign({input: classes.input}, extClasses?.input)}/>}
      {...other}
      inputProps={{title: value?.toString()}}
    >
      {options.map((v) => {
        const key = v.valueOf();
        const text = empty_text && v.empty && v.empty() ? empty_text : suggestionText(v);
        return <MenuItem
          key={key}
          value={key}
          onMouseEnter={optionEnter}
          onMouseLeave={optionLeave}
        >{text}</MenuItem>;
      })}
    </Select>
  </FormControl>;
}

export default withStyles(CssField);

