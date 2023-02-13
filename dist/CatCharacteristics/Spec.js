/**
 * Показывает фрагмент спецификации, обрезанный элементом или слоем
 *
 * @module SpecFragment
 *
 * Created by Evgeniy Malyarov on 19.05.2020.
 */

import React from 'react';
import PropTypes from 'prop-types';
import TabularSection from 'metadata-react/TabularSection';
import Dialog from 'metadata-react/App/Dialog';
import DataObj from 'metadata-react/FrmObj/DataObj';
import withStyles from 'metadata-react/styles/paper600';
import BtnOrigin from './BtnOrigin';
const FrmObj = withStyles(DataObj);
class Spec extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleClose = () => this.setState({
      open: false
    });
    this.handleOpen = () => {
      const {
        spec_ref,
        props: {
          _obj
        }
      } = this;
      if (spec_ref) {
        const {
          _tabular,
          selected
        } = spec_ref.state;
        if (selected && selected.hasOwnProperty('rowIdx')) {
          this.row = spec_ref.rowGetter(selected.rowIdx);
          this.fld = 'origin';
          if (typeof this.row.origin === 'number') {
            this.row = _obj.cnn_elmnts.get(this.row.origin - 1);
            this.fld = 'cnn';
          }
          if (this.row[this.fld]) {
            this.setState({
              open: true
            });
          }
        }
      }
    };
    this.filter = collection => {
      const res = [];
      const {
        elm
      } = this.props;
      collection.forEach(row => {
        if (!elm || row.elm === elm) {
          res.push(row);
        }
      });
      return res;
    };
    this.state = {
      open: false
    };
    if (props.scheme) {
      this.scheme = props.scheme;
    } else {
      $p.cat.scheme_settings.find_rows({
        obj: 'cat.characteristics.specification'
      }, scheme => {
        if (scheme.name.endsWith('main')) {
          this.scheme = scheme;
          return true;
        }
      });
    }
  }
  render() {
    const {
      state: {
        open
      },
      props: {
        _obj
      },
      row,
      fld
    } = this;
    const origin = open && row[fld];
    return [/*#__PURE__*/React.createElement(TabularSection, {
      key: "ts_spec",
      _obj: _obj,
      _tabular: "specification",
      scheme: this.scheme,
      filter: this.filter,
      denyAddDel: true,
      denyReorder: true,
      ref: el => this.spec_ref = el,
      btns: /*#__PURE__*/React.createElement(BtnOrigin, {
        key: "origin",
        handleOpen: this.handleOpen
      })
    }), open && /*#__PURE__*/React.createElement(Dialog, {
      open: true,
      noSpace: true,
      title: origin.presentation || 'Ссылка оборвана',
      onClose: this.handleClose
      //initFullScreen
    }, /*#__PURE__*/React.createElement(FrmObj, {
      _mgr: origin._manager,
      _acl: "r",
      match: {
        params: {
          ref: origin.ref
        }
      },
      handlers: {}
    }))];
  }
}
export default Spec;