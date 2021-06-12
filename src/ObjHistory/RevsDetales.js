import React from 'react';
import PropTypes from 'prop-types';

class RevsDetales extends React.Component {

  state = {};

  revs_rows(src) {
    const rows = [];
    for(const {timestamp, _rev} of src) {
      if(timestamp) {
        const row = {
          _rev,
          date: moment(timestamp.moment, 'YYYY-MM-DDTHH:mm:ss ZZ').toDate(),
          user: timestamp.user,
        };
        rows.push(row);
      }
    }
    return Promise.resolve(rows);
  }

  componentDidMount() {
    const {rows, _mgr} = this.props;
    const revs_rows = _mgr.revs_rows || this.revs_rows;
    revs_rows(rows).then((rows) => this.setState({rows}));
  }

  render() {
    const {rows} = this.state;
    return rows ? `length: ${rows.length}` : 'loading...';
  }
}

export default RevsDetales;

RevsDetales.propTypes = {
  rows: PropTypes.array.isRequired,
  setClose: PropTypes.func.isRequired,
};
