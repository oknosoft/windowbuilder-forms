/**
 * История изменений объекта
 *
 * @module ObjHistory
 *
 * Created by Evgeniy Malyarov on 15.10.2020.
 */

import React from 'react';
import PropTypes from 'prop-types';
import RevsDetales from './RevsDetales';

class ObjHistory extends React.Component {

  state = {loaded: false, rows: [], err: ''};

  componentDidMount() {
    // читаем историю из couchdb

    // отбрасываем лишние реквизиты
    let {hfields, db, obj, _mgr} = this.props;
    if(!hfields) {
      hfields = _mgr.metadata().history_fields;
    }
    if(!hfields) {
      hfields = {};
      for(const fld in _mgr.metadata().fields) {
        hfields[fld] = true;
      }
      for(const ts in _mgr.metadata().tabular_sections) {
        hfields[ts] = {count: true, fields: {}};
      }
    }
    if(!db) {
      db = _mgr.adapter.db(_mgr);
    }
    db.get(`${_mgr.class_name}|${obj.ref}`, {revs_info: true})
      .then(async (res) => {
        const rows = [res];
        const docs = [];
        for(const {rev, status} of res._revs_info) {
          if(status === "available" && rev !== res._rev) {
            docs.push({id: res._id, rev});
          }
        }
        if(docs.length) {
          const {results} = await db.bulkGet({docs});
          for(const {docs} of results) {
            if(docs[0] && docs[0].ok) {
              rows.push(docs[0].ok);
            }
          }
        }
        this.setState({loaded: true, rows});
      })
      .catch((err) => {
        this.setState({err: err.message, rows: []});
      });
  }

  render() {
    const {props: {_mgr}, state: {loaded, rows, err}} = this;
    const Detales = _mgr.RevsDetales || RevsDetales;
    if(err) {
      return `err: ${err}`;
    }
    if(!loaded) {
      return 'loading...';
    }
    return <Detales rows={rows} _mgr={_mgr}/>;
  }
}

ObjHistory.propTypes = {
  _mgr: PropTypes.object.isRequired,
  obj: PropTypes.object.isRequired,
  hfields: PropTypes.array,
  db: PropTypes.object,
};

export default ObjHistory;
