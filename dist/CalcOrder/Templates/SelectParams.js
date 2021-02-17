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
      clr
    } = _obj;

    const _meta = Object.assign({}, _manager.metadata('clr'));

    clr._manager.selection_exclude_service(_meta, _obj.sys);

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PropField, {
      key: `prm-clr`,
      _obj: _obj,
      _fld: "clr",
      _meta: _meta
    }), /*#__PURE__*/React.createElement(LinkedProps, {
      ts: _obj.params,
      cnstr: 0,
      inset: $p.utils.blank.guid
    }));
  }

}

export default SelectParams;