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

export default function SelectParams({_obj}) {

  const {_manager, clr} = _obj;
  const _meta = Object.assign({}, _obj._manager.metadata('clr'));
  clr._manager.selection_exclude_service(_meta, _obj.sys);

  return <>
    <PropField
      key={`prm-clr`}
      _obj={_obj}
      _fld="clr"
      _meta={_meta}
    />
    <LinkedProps ts={_obj.params} cnstr={0} inset={$p.utils.blank.guid}/>
  </>;
}
