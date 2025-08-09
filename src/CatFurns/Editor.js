
import React from 'react';
import PropTypes from 'prop-types';
import FieldSelect from 'metadata-react/DataField/FieldSelect';
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

  const {furn, _ox, cnstr, furn_cache: cache, sys, level} = _obj;
  const list = [];
  const bool = true;
  const read_only = sys.furn_level > level;

  if(!read_only) {
    // учтём связи параметров
    const {cat, job_prm: {builder}} = $p;
    const furns = builder.ign_tech_restrictions ?
      cat.furns.find_rows({is_set: false, _top: 3000}) : sys.furns(_ox, _obj).map(({furn}) => furn);
    const all = furns.length ? furns : cat.furns.find_rows({is_set: false, _top: 3000});

    // получим список доступных
    let weight;
    for(const furn of all) {
      if(furn.is_folder || furn.is_set || _obj.open_restrictions_err({furn, cache, bool})) {
        continue;
      }
      const weight_max = furn.furn_set.flap_weight_max;
      if(weight_max) {
        if(!weight) {
          weight = _ox.elm_weight(-cnstr);
        }
        if(weight_max < weight) {
          continue;
        }
      }
      list.push(furn);
    }
    list.sort(compare);
  }

  _meta = Object.assign({}, _obj._metadata('furn'), {list});
  delete _meta.choice_params;
  delete _meta.choice_links;
  return <FieldSelect
    extClasses={extClasses(classes)}
    fullWidth
    isTabular={false}
    _obj={_obj}
    _meta={_meta}
    error={!read_only && !list.includes(furn)}
    read_only={read_only}
    {...props}
  />;
}

export default withStyles(FieldFurn);

FieldFurn.propTypes = {
  _obj: PropTypes.object.isRequired,
  _fld: PropTypes.string.isRequired,
};
