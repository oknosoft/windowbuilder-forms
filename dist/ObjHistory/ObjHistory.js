/**
 * История изменений объекта
 *
 * @module ObjHistory
 *
 * Created by Evgeniy Malyarov on 15.10.2020.
 */
import React from 'react';
import PropTypes from 'prop-types';

class ObjHistory extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      loaded: false,
      rows: [],
      err: ''
    };
  }

  componentDidMount() {
    // читаем историю из couchdb
    // отбрасываем лишние реквизиты
    let {
      hfields,
      db,
      obj,
      _mgr
    } = this.props;

    if (!hfields) {
      hfields = _mgr.metadata().history_fields;
    }

    if (!hfields) {
      hfields = {};

      for (const fld in _mgr.metadata().fields) {
        hfields[fld] = true;
      }

      for (const ts in _mgr.metadata().tabular_sections) {
        hfields[ts] = {
          count: true,
          fields: {}
        };
      }
    }

    if (!db) {
      db = _mgr.adapter.db(_mgr);
    }

    db.get(`${_mgr.class_name}|${obj.ref}`, {
      revs_info: true
    }).then(res => {
      this.setState({
        loaded: true,
        rows: res._revs_info
      });
    }).catch(err => {
      this.setState({
        err: err.message,
        rows: []
      });
    });
  }

  render() {
    const {
      loaded,
      rows,
      err
    } = this.state;
    return err ? `err: ${err}` : loaded ? `length: ${rows.length}` : 'loading';
  }

}

export default ObjHistory;