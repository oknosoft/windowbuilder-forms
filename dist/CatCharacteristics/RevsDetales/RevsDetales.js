import React from 'react';
import Grid from '@material-ui/core/Grid';
import ReactDataGrid from 'react-data-grid';
import { withStyles } from '@material-ui/styles';
import Proto from '../../ObjHistory/RevsDetales';
import Left from './Left';
import { styles } from '../../CalcOrder/RevsDetales';
import Right from './Right';
import ToolBtns from './ToolBtns';
class RevsDetales extends Proto {
  constructor(...args) {
    super(...args);
    this.setTab = tab => {
      this.setState({
        tab
      });
      this.props.setToolBtns(/*#__PURE__*/React.createElement(ToolBtns, {
        setTab: this.setTab,
        tab: tab
      }));
    };
    this.handleClose = () => {
      const {
        props
      } = this;
      props.resetObj();
      return props.isRoot;
    };
    this.set_params = ({
      rowIdx
    }) => {
      const {
        params,
        svg,
        specification
      } = this.state.rows[rowIdx];
      this.setState({
        params,
        svg,
        specification
      });
    };
    this.revs_rows = src => {
      const rows = [];
      const tx = $p.cat.characteristics.create({}, false, true);
      for (const {
        timestamp,
        _rev,
        owner,
        params,
        specification,
        clr,
        x,
        y,
        s,
        svg
      } of src) {
        if (timestamp) {
          const row = {
            _rev,
            date: moment(timestamp.moment, 'YYYY-MM-DDTHH:mm:ss ZZ').toDate(),
            user: timestamp.user,
            owner,
            params: this.filter_params(tx, params),
            specification,
            clr,
            x,
            y,
            s,
            svg
          };
          rows.push(row);
        }
      }
      tx.unload();
      return Promise.resolve(rows);
    };
  }
  componentDidMount() {
    super.componentDidMount();
    const {
      props,
      state,
      handleClose
    } = this;
    if (!props.isRoot) {
      props.setClose({
        handler: handleClose,
        text: 'Вернуться в заказ'
      });
    }
    props.setToolBtns(/*#__PURE__*/React.createElement(ToolBtns, {
      setTab: this.setTab,
      tab: 0
    }));
  }
  componentWillUnmount() {
    const {
      props,
      unmounted
    } = this;
    if (!unmounted && !props.isRoot) {
      props.setClose({
        handler: null,
        text: ''
      });
    }
    props.setToolBtns(null);
  }
  filter_params(tx, tparams) {
    const res = [];
    if (tparams) {
      tx.params.load(tparams.filter(row => !row.hide));
      for (const {
        cnstr,
        inset,
        param,
        value
      } of tx.params) {
        if (!param.is_calculated || param.show_calculated) {
          res.push({
            cnstr,
            inset,
            param,
            value
          });
        }
      }
    }
    return res;
  }
  render() {
    let {
      state: {
        rows,
        params,
        svg,
        tab,
        specification
      },
      props: {
        classes
      }
    } = this;
    if (!params) {
      params = [];
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
    }, /*#__PURE__*/React.createElement(Left, {
      rows: rows,
      set_params: this.set_params,
      svg: svg
    })), /*#__PURE__*/React.createElement(Grid, {
      item: true,
      sm: 12,
      md: 7
    }, /*#__PURE__*/React.createElement(Right, {
      params: params,
      specification: specification,
      classes: classes,
      tab: tab || 0,
      setTab: this.setTab
    })))) : 'loading...';
  }
}
export default withStyles(styles)(RevsDetales);