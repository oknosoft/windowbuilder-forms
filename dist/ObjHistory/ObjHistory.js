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
  constructor(props, context) {
    super(props, context);

    this.changeObj = ({
      obj,
      _mgr,
      db
    }) => {
      this.setState({
        obj,
        _mgr,
        db,
        loaded: false
      }, this.componentDidMount.bind(this));
    };

    this.resetObj = () => {
      const {
        obj,
        _mgr,
        db
      } = this.props;
      this.setState({
        obj,
        _mgr,
        db,
        loaded: false
      }, this.componentDidMount.bind(this));
    };

    this.state = {
      loaded: false,
      rows: [],
      err: '',
      obj: props.obj,
      _mgr: props._mgr,
      db: props.db
    };
  }

  componentDidMount() {
    // читаем историю из couchdb
    // отбрасываем лишние реквизиты
    let {
      obj,
      _mgr,
      db
    } = this.state;

    if (!db) {
      db = _mgr.adapter.db(_mgr);
    }

    db.get(`${_mgr.class_name}|${obj.ref}`, {
      revs_info: true
    }).then(async res => {
      const rows = [res];
      const docs = [];

      for (const {
        rev,
        status
      } of res._revs_info) {
        if (status === "available" && rev !== res._rev) {
          docs.push({
            id: res._id,
            rev
          });
        }
      }

      if (docs.length) {
        const {
          results
        } = await db.bulkGet({
          docs
        });

        for (const {
          docs
        } of results) {
          if (docs[0] && docs[0].ok) {
            rows.push(docs[0].ok);
          }
        }
      }

      this.setState({
        loaded: true,
        rows
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
      state: {
        loaded,
        rows,
        err,
        obj,
        _mgr
      },
      props
    } = this;
    const Detales = _mgr.RevsDetales || RevsDetales;
    const isRoot = props.obj === obj;

    if (err) {
      return `err: ${err}`;
    }

    if (!loaded) {
      return 'loading...';
    }

    return /*#__PURE__*/React.createElement(Detales, {
      rows: rows,
      obj: obj,
      _mgr: _mgr,
      isRoot: isRoot,
      changeObj: this.changeObj,
      resetObj: this.resetObj,
      setClose: props.setClose
    });
  }

}

export default ObjHistory;