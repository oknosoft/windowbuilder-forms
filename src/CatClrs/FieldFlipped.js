/**
 * Поле ввода перевёрнутости слоя
 */

import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import withStyles, {extClasses} from 'metadata-react/DataField/stylesPropertyGrid';

function FieldFlipped({classes, _obj, _fld, _meta, onClick, ...props}) {

  if($p.job_prm.builder.hide_flipped) {
    return null;
  }

  const ext = extClasses(classes);

  _fld = 'flipped';
  const onChange = ({target}) => {
    _obj[_fld] = target.value;
  };

  return <FormControl classes={ext.control} onClick={onClick} fullWidth>
    <InputLabel classes={ext.label}>Перевёрнутость</InputLabel>
    <Select
      value={_obj._row?.[_fld] || 0}
      onChange={onChange}
      input={<Input classes={ext.input}/>}
    >
      <MenuItem value={0}>Авто</MenuItem>
      <MenuItem value={1}>Перевёрнут</MenuItem>
      <MenuItem value={-1}>Обычный</MenuItem>
    </Select>
  </FormControl>;
}

export default withStyles(FieldFlipped);

FieldFlipped.propTypes = {
  _obj: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};
