import React from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import NextWeekIcon from '@material-ui/icons/NextWeek';
import WorkIcon from '@material-ui/icons/Work';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import Tip from 'metadata-react/App/Tip';
import CloseBtn from 'metadata-react/App/CloseButton';
import DirectList from 'metadata-react/DynList';
import QuickFilter from '../FrmList/QuickFilter';
const {
  cat: {
    templates,
    scheme_settings
  },
  doc: {
    calc_order: _mgr
  }
} = $p;
const _obj = templates._select_template;
const schemas = {};
const modes = {
  list: '',
  templates: 'ram'
};
scheme_settings.find_rows({
  obj: 'doc.calc_order'
}, scheme => {
  if (scheme.name.endsWith('main')) {
    schemas.list = scheme;
    scheme.set_standard_period(true);
  } else if (scheme.name.endsWith('templates')) {
    schemas.templates = scheme;
  }
});

const styles = theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },
  flex: {
    flex: 1
  }
});

var _ref = /*#__PURE__*/React.createElement(Typography, {
  key: "descr",
  variant: "body2",
  color: "primary"
}, "Изделия-шаблоны, живут в специальных заказах со статусом ", /*#__PURE__*/React.createElement("i", null, "Шаблон"), ".", /*#__PURE__*/React.createElement("br", null), "По умолчанию, выбор происходит из последнего открытого заказа-шаблона. При желании, изделие можно заполнить по образу любого изделия из любого заказа - не обязательно шаблона.");

var _ref2 = /*#__PURE__*/React.createElement(NextWeekIcon, null);

var _ref3 = /*#__PURE__*/React.createElement(WorkIcon, null);

var _ref4 = /*#__PURE__*/React.createElement(CircularProgress, {
  color: "inherit"
});

class SelectOrder extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      backdrop: false,
      handleFilterChange: null
    };

    this.registerFilterChange = handleFilterChange => {
      if (this.state.handleFilterChange !== handleFilterChange) {
        this.setState({
          handleFilterChange
        });
      }
    };
  }

  render() {
    const {
      props: {
        list,
        set_list,
        handleNext,
        classes
      },
      state: {
        backdrop,
        handleFilterChange
      }
    } = this;
    const {
      calc_order
    } = _obj;
    const text = `${calc_order.number_doc} (${calc_order.note})`;

    const reset_list = () => {
      this.setState({
        backdrop: false
      });
      set_list('');
    };

    const setBackdrop = () => {
      this.setState({
        backdrop: true
      });
    };

    return [_ref, !list && /*#__PURE__*/React.createElement(Toolbar, {
      key: "bar",
      disableGutters: true,
      variant: "dense"
    }, /*#__PURE__*/React.createElement(TextField, {
      disabled: true,
      label: "Заказ-шаблон",
      defaultValue: text,
      className: classes.flex
    }), /*#__PURE__*/React.createElement(Tip, {
      title: "Выбрать шаблон"
    }, /*#__PURE__*/React.createElement(IconButton, {
      onClick: () => set_list('templates')
    }, _ref2)), /*#__PURE__*/React.createElement(Tip, {
      title: "Выбрать из полного списка заказов"
    }, /*#__PURE__*/React.createElement(IconButton, {
      onClick: () => set_list('list')
    }, _ref3))), Boolean(list) && /*#__PURE__*/React.createElement(DirectList, {
      key: "list",
      frm_key: list,
      selectionMode: true,
      denyAddDel: true,
      read_only: true,
      setting_in_menu: true,
      hide_edit: true,
      show_variants: false,
      _mgr: _mgr,
      scheme: schemas[list],
      source_mode: modes[list],
      handlers: {
        handleSelect(doc) {
          setBackdrop();

          _mgr.create(doc).then(doc => {
            _obj.calc_order = doc;
            return list === 'templates' ? doc.load_templates() : doc.load_linked_refs();
          }).then(reset_list).then(handleNext).catch(reset_list);
        }

      },
      registerFilterChange: this.registerFilterChange,
      btns: /*#__PURE__*/React.createElement(QuickFilter, {
        scheme: schemas[list],
        _mgr: _mgr,
        handleFilterChange: handleFilterChange,
        frm_key: list
      }),
      alter_end_btns: /*#__PURE__*/React.createElement(CloseBtn, {
        handleClose: reset_list
      })
    }), /*#__PURE__*/React.createElement(Backdrop, {
      key: "backdrop",
      className: classes.backdrop,
      open: backdrop
    }, "Загрузка продукций...", _ref4)];
  }

}

export default withStyles(styles)(SelectOrder);