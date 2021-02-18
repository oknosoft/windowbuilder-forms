/**
 *
 *
 * @module SelectParams
 *
 * Created by Evgeniy Malyarov on 08.10.2020.
 */

import React from 'react';
import PropTypes from 'prop-types';
import PropField from 'metadata-react/DataField/PropField';
import LinkedProps from '../../Common/LinkedProps';

class SelectParams extends React.Component {

  componentDidMount() {
    const {_manager} = this.props._obj;
    _manager.on({update: this.onDataChange});
  }

  componentWillUnmount() {
    const {_manager} = this.props._obj;
    _manager.off({update: this.onDataChange});
  }

  onDataChange = (obj, fields) => {
    const {_obj} = this.props;
    if(($p.utils.is_tabular(obj) && obj._owner._owner === _obj) || (obj === _obj)) {
      this.forceUpdate();
    }
  };

  render() {
    const {_obj} = this.props;
    const {_manager, clr, sys} = _obj;
    const _meta = Object.assign({}, _manager.metadata('clr'));
    const {utils, cat} = $p;

    const selection = {};
    clr._manager.selection_exclude_service(_meta, sys);
    _meta.choice_params.forEach(({name, path}) => {
      selection[name] = path;
    });
    if(clr.empty() || !utils._selection(clr, selection)) {
      _obj.clr = sys.default_clr.empty() ? cat.clrs.predefined('Белый') : sys.default_clr;
    }

    return <>
      <PropField
        key={`prm-clr`}
        _obj={_obj}
        _fld="clr"
        _meta={_meta}
      />
      <LinkedProps ts={_obj.params} cnstr={0} inset={utils.blank.guid}/>
    </>;
  }
}

export default SelectParams;
