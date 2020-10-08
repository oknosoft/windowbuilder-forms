import React from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import NextWeekIcon from '@material-ui/icons/NextWeek';
import WorkIcon from '@material-ui/icons/Work';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Tip from '../../Common/Tip';
import CloseBtn from '../../Common/CloseBtn';
import DirectList from '../FrmList/DirectList';
const _obj = $p.cat.templates._select_template;
const schemas = {};
$p.cat.scheme_settings.find_rows({
  obj: 'doc.calc_order'
}, scheme => {
  if (scheme.name.endsWith('main')) {
    schemas.list = scheme;
    scheme.set_standard_period(true);
  } else if (scheme.name.endsWith('templates')) {
    schemas.templates = scheme;
  }
});
const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },
  flex: {
    flex: 1
  }
}));

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

export default function SelectOrder({
  list,
  set_list,
  handleNext
}) {
  const [backdrop, set_backdrop] = React.useState(false);
  const {
    calc_order
  } = _obj;
  const text = `${calc_order.number_doc} (${calc_order.note})`;

  const reset_list = () => {
    set_backdrop(false);
    set_list('');
  };

  const classes = useStyles();
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
    selectionMode: true,
    denyAddDel: true,
    read_only: true,
    show_variants: false,
    _mgr: $p.doc.calc_order,
    scheme: schemas[list],
    handlers: {
      handleSelect(doc) {
        set_backdrop(true);
        $p.doc.calc_order.create(doc).then(doc => {
          _obj.calc_order = doc;
          return doc.load_linked_refs();
        }).then(reset_list).then(handleNext).catch(reset_list);
      }

    },
    alter_end_btns: /*#__PURE__*/React.createElement(CloseBtn, {
      handleClose: reset_list
    })
  }), /*#__PURE__*/React.createElement(Backdrop, {
    key: "backdrop",
    className: classes.backdrop,
    open: backdrop
  }, "Загрузка продукций...", _ref4)];
}