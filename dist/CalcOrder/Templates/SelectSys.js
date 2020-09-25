import React from 'react';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import SelectSysTree from './SelectSysTree';
import SelectSysList from './SelectSysList';
const useStyles = makeStyles({
  label: {
    marginLeft: 0
  },
  top: {
    marginTop: 8
  }
});
const {
  cat: {
    templates,
    property_values_hierarchy: vh
  }
} = $p;
const _obj = templates._select_template;
const empty_hierarchy = vh.get();

var _ref = /*#__PURE__*/React.createElement(Typography, {
  key: "descr1",
  variant: "body2",
  color: "primary"
}, "Можно перезаполнить параметры по системе, либо сохранить параметры, заданные в изделии-шаблоне");

export default function SelectSys({
  handleNext
}) {
  const [refill, set_refill] = React.useState(_obj.refill);
  const [sys, set_sys] = React.useState(_obj.sys);
  const [group, set_group] = React.useState(_obj.sys._extra('sys_hierarchy') || empty_hierarchy);

  const refillChange = ({
    target
  }) => {
    _obj.refill = target.checked;
    set_refill(target.checked);
  };

  const groupChange = (e, v) => {
    set_group(vh.get(v));
  };

  const sysChange = v => {
    _obj.sys = v;
    set_sys(v);
  };

  const classes = useStyles();
  return [_ref, /*#__PURE__*/React.createElement(TextField, {
    key: "base_block",
    InputProps: {
      readOnly: true
    },
    label: "Типовой блок",
    value: _obj.base_block.toString(),
    fullWidth: true
  }), /*#__PURE__*/React.createElement(Typography, {
    key: "descr2",
    variant: "body2",
    color: "primary",
    className: classes.top
  }, "Можно сохранить систему типового блока, либо выбрать другую"), /*#__PURE__*/React.createElement(FormControlLabel, {
    key: "refill",
    labelPlacement: "start",
    className: classes.label,
    control: /*#__PURE__*/React.createElement(Switch, {
      checked: refill,
      onChange: refillChange,
      value: "refill"
    }),
    label: `Задействовать параметры ${refill ? 'системы' : 'изделия'}`
  }), /*#__PURE__*/React.createElement(TextField, {
    key: "sys",
    InputProps: {
      readOnly: true
    },
    label: "Система",
    value: sys.toString(),
    fullWidth: true
  }), refill && /*#__PURE__*/React.createElement(Grid, {
    key: "select_sys",
    container: true,
    spacing: 1,
    className: classes.label
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: 12,
    sm: 4
  }, /*#__PURE__*/React.createElement(SelectSysTree, {
    group: group.valueOf(),
    set_group: groupChange
  })), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: 12,
    sm: 8
  }, /*#__PURE__*/React.createElement(SelectSysList, {
    group: group,
    sys: sys,
    _obj: _obj,
    set_sys: sysChange,
    handleNext: handleNext
  })))];
}