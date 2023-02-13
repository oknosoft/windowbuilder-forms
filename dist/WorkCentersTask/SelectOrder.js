var _IconWork;
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import IconWork from '@material-ui/icons/Work';
//import Dialog from 'metadata-react/DnR/Dialog';
import Dialog from 'metadata-react/App/Dialog';
import DataList from 'metadata-react/DynList/DynList';
class SelectOrder extends Component {
  constructor(_props, context) {
    super(_props, context);
    this.handleTouchTap = event => {
      // This prevents ghost click.
      event.preventDefault();
      this.setState({
        open: true
      });
    };
    this.handleRequestClose = () => {
      this.setState({
        open: false
      });
    };
    this.handleSelect = (row, _mgr) => {
      this.handleRequestClose();
      this.props.handleSelect(row, _mgr);
    };
    this.find_rows = selector => {
      const {
        remote,
        props
      } = $p.adapters.pouch;
      const {
        username,
        password
      } = remote.doc.__opts.auth;
      selector.sort = [{
        date: 'desc'
      }];
      const headers = new Headers();
      headers.append('Authorization', 'Basic ' + btoa(unescape(encodeURIComponent(username + ':' + password))));
      headers.append('suffix', props._suffix || '0');
      const opts = {
        method: 'post',
        credentials: 'include',
        headers,
        body: JSON.stringify(selector)
      };
      return fetch('/r/_find', opts).then(res => {
        if (res.status <= 201) {
          return res.json();
        } else {
          return res.text().then(text => {
            throw new Error(`${res.statusText}: ${text}`);
          });
        }
      }).then(data => {
        data.docs.forEach(doc => {
          doc.ref = doc._id.split('|')[1];
          delete doc._id;
        });
        return data;
      });
    };
    this.state = {
      open: false
    };
  }
  render() {
    const {
      handleSelect,
      props,
      state
    } = this;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(IconButton, {
      title: "Добавить из заказа",
      onClick: this.handleTouchTap
    }, _IconWork || (_IconWork = /*#__PURE__*/React.createElement(IconWork, null))), state.open && /*#__PURE__*/React.createElement(Dialog, {
      open: true,
      noSpace: true,
      large: true
      //initFullScreen
      ,
      title: "Добавить из заказа",
      onClose: this.handleRequestClose
    }, /*#__PURE__*/React.createElement(DataList, {
      height: 480,
      _mgr: $p.doc.calc_order,
      _acl: props._acl,
      handlers: {
        handleSelect
      }
      //find_rows={this.find_rows}
      ,
      selectionMode: true,
      denyAddDel: true
      //show_variants
      ,
      show_search: true
    })));
  }
}
export default SelectOrder;