import React from 'react';
import Grid from '@material-ui/core/Grid';
import ReactDataGrid from 'react-data-grid';
import { withStyles } from '@material-ui/styles';
import Proto from '../ObjHistory/RevsDetales';
export const styles = theme => ({
  root: {
    flexGrow: 1,
    marginRight: theme.spacing()
  },
  empty: {
    margin: 'auto',
    marginTop: 50,
    textAlign: 'center'
  }
});
export const DateFormatter = ({
  value
}) => {
  const values = moment(value).format(moment._masks.date_time).split(' ');
  return /*#__PURE__*/React.createElement("div", null, values[0], /*#__PURE__*/React.createElement("small", null, ` ${values[1]}`));
};
export const NomFormatter = ({
  value
}) => {
  const nom = $p.cat.nom.get(value);
  return nom.presentation;
};
const columns_doc = [{
  key: 'state',
  name: 'Статус',
  width: 100,
  resizable: true
}, {
  key: 'date',
  name: 'Дата',
  width: 140,
  resizable: true,
  formatter: DateFormatter
}, {
  key: 'user',
  name: 'Автор',
  resizable: true
}, {
  key: 'count',
  name: 'Строк',
  width: 70,
  resizable: true
}, {
  key: 'doc_amount',
  name: 'Сумма',
  width: 100,
  resizable: true
}];
const columns_prod = [{
  key: 'nom',
  name: 'Номенклатура',
  resizable: true,
  formatter: NomFormatter
}, {
  key: 'len',
  name: 'x',
  width: 70,
  resizable: true
}, {
  key: 'width',
  name: 'y',
  width: 70,
  resizable: true
}, {
  key: 's',
  name: 's',
  width: 70,
  resizable: true
}, {
  key: 'quantity',
  name: 'Колич',
  width: 60,
  resizable: true
}, {
  key: 'price',
  name: 'Цена',
  width: 80,
  resizable: true
}, {
  key: 'discount_percent',
  name: 'Скид%',
  width: 60,
  resizable: true
}, {
  key: 'amount',
  name: 'Сумма',
  width: 80,
  resizable: true
}];
const EmptyRowsView = classes => () => /*#__PURE__*/React.createElement("div", {
  className: classes.empty
}, "Укажите строку версии заказа (слева)");
class RevsDetales extends Proto {
  constructor(...args) {
    super(...args);
    this.handleCx = (idx, {
      characteristic
    }) => {
      const _mgr = $p.cat.characteristics;
      const {
        props
      } = this;
      _mgr.get(characteristic, 'promise').then(obj => {
        if (!obj || obj.empty() || obj.calc_order !== props.obj) {
          console.log(characteristic);
        } else {
          props.changeObj({
            obj,
            _mgr
          });
        }
      });
    };
  }
  revs_rows(src) {
    const rows = [];
    for (const {
      timestamp,
      _rev,
      production,
      doc_amount,
      obj_delivery_state
    } of src) {
      if (timestamp) {
        const row = {
          _rev,
          date: moment(timestamp.moment, 'YYYY-MM-DDTHH:mm:ss ZZ').toDate(),
          user: timestamp.user,
          count: production.length,
          doc_amount,
          production,
          state: obj_delivery_state
        };
        rows.push(row);
      }
    }
    return Promise.resolve(rows);
  }
  render() {
    let {
      state: {
        rows,
        production
      },
      props: {
        classes
      }
    } = this;
    if (!production) {
      production = [];
    }
    return rows ? /*#__PURE__*/React.createElement("div", {
      className: classes.root
    }, /*#__PURE__*/React.createElement(Grid, {
      container: true,
      spacing: 1
    }, /*#__PURE__*/React.createElement(Grid, {
      item: true,
      sm: 12,
      md: 5
    }, /*#__PURE__*/React.createElement(ReactDataGrid, {
      columns: columns_doc,
      rowGetter: i => rows[i],
      rowsCount: rows.length,
      onCellSelected: ({
        rowIdx
      }) => {
        this.setState({
          production: rows[rowIdx].production
        });
      }
    })), /*#__PURE__*/React.createElement(Grid, {
      item: true,
      sm: 12,
      md: 7
    }, /*#__PURE__*/React.createElement(ReactDataGrid, {
      columns: columns_prod,
      rowGetter: i => production[i],
      rowsCount: production.length,
      onRowDoubleClick: this.handleCx,
      emptyRowsView: EmptyRowsView(classes)
    })))) : 'loading...';
  }
}
export default withStyles(styles)(RevsDetales);