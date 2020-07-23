import React from 'react';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DataField from 'metadata-react/DataField';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  label: {
    marginLeft: 0
  }
});
const _obj = $p.cat.templates._select_template;

var _ref = /*#__PURE__*/React.createElement(Typography, {
  key: "descr1",
  variant: "body2",
  color: "primary"
}, "Можно перезаполнить параметры по системе, либо сохранить параметры, заданные в изделии-шаблоне");

var _ref2 = /*#__PURE__*/React.createElement(Typography, {
  key: "descr2",
  variant: "body2",
  color: "primary"
}, "Можно сохранить систему типового блока, либо выбрать другую");

var _ref3 = /*#__PURE__*/React.createElement(DataField, {
  key: "base_block",
  _obj: _obj,
  _fld: "base_block",
  fullWidth: true,
  read_only: true
});

export default function SelectSys() {
  const [refill, set_refill] = React.useState(_obj.refill);

  const refillChange = ({
    target
  }) => {
    _obj.refill = target.checked;
    set_refill(target.checked);
  };

  const classes = useStyles();
  return [_ref, _ref2, _ref3, /*#__PURE__*/React.createElement(FormControlLabel, {
    key: "refill",
    labelPlacement: "start",
    className: classes.label,
    control: /*#__PURE__*/React.createElement(Switch, {
      checked: refill,
      onChange: refillChange,
      value: "refill"
    }),
    label: `Задействовать параметры ${refill ? 'системы' : 'изделия'}`
  }), /*#__PURE__*/React.createElement(DataField, {
    key: "sys",
    _obj: _obj,
    _fld: "sys",
    fullWidth: true,
    read_only: !refill
  })];
}