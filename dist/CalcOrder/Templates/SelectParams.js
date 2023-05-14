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
  constructor(...args) {
    super(...args);
    this.onDataChange = (obj, fields) => {
      const {
        _obj
      } = this.props;
      if ($p.utils.is_tabular(obj) && obj._owner._owner === _obj || obj === _obj) {
        this.forceUpdate();
      }
    };
  }
  componentDidMount() {
    const {
      _manager
    } = this.props._obj;
    _manager.on({
      update: this.onDataChange
    });
  }
  componentWillUnmount() {
    const {
      _manager
    } = this.props._obj;
    _manager.off({
      update: this.onDataChange
    });
  }
  render() {
    const {
      _obj
    } = this.props;
    const {
      _manager,
      clr,
      sys
    } = _obj;
    const _meta = Object.assign({}, _manager.metadata('clr'));
    const {
      utils,
      cat
    } = $p;
    const selection = {};
    const clr_group = cat.clrs.selection_exclude_service(_meta, sys, _obj);
    if (_meta.choice_params.length > 2) {
      _meta.choice_params.forEach(({
        name,
        path
      }) => {
        selection[name] = path;
      });
    }
    const clrs = [...clr_group.clrs()];
    if (clr.empty() || !clr_group.contains(clr, clrs) || !utils._selection(clr, selection)) {
      const {
        default_clr
      } = sys;
      _obj.clr = default_clr.empty() || !clr_group.contains(default_clr, clrs) ? clrs.length ? clrs[0] : cat.clrs.predefined('Белый') : default_clr;
    }
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PropField, {
      key: `prm-clr`,
      _obj: _obj,
      _fld: "clr",
      _meta: _meta
    }), /*#__PURE__*/React.createElement(LinkedProps, {
      ts: _obj.params,
      cnstr: 0,
      inset: utils.blank.guid,
      project: _obj
    }));
  }
}
export default SelectParams;