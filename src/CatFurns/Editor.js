
import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PropField from 'metadata-react/DataField/PropField';
import FieldSelect from 'metadata-react/DataField/FieldSelect';
import FieldInfinit from 'metadata-react/DataField/FieldInfinit/FieldAutocomplete';
import useStyles from 'wb-forms/dist/Common/stylesAccordion';
import withStyles, {extClasses} from 'metadata-react/DataField/stylesPropertyGrid';

const compare = (a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};

function FieldFurn({classes, _obj, _meta, ...props}) {

  const {furn, _ox, cnstr, furn_cache: cache} = _obj;
  const list = [];
  const bool = true;

  // учтём связи параметров
  const furns = _ox.sys.furns(_ox, _obj).map(({furn}) => furn);
  const all = furns.length ? furns : furn._manager;

  // получим список доступных
  for(const furn of all) {
    if(furn.is_folder || furn.is_set || _obj.open_restrictions_err({furn, cache, bool})) {
      continue;
    }
    const weight_max = furn.furn_set.flap_weight_max;
    if(weight_max && weight_max < _ox.elm_weight(-cnstr)) {
      continue;
    }
    list.push(furn);
  }
  list.sort(compare);
  _meta = Object.assign({}, _obj._metadata('furn'), {list});
  delete _meta.choice_params;
  delete _meta.choice_links;
  return <FieldSelect extClasses={extClasses(classes)} fullWidth isTabular={false} _obj={_obj} _meta={_meta} error={!list.includes(furn)} {...props}/>;
}

export default withStyles(FieldFurn);

FieldFurn.propTypes = {
  _obj: PropTypes.object.isRequired,
  _fld: PropTypes.string.isRequired,
};
