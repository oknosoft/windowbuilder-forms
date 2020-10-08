import React from 'react';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import SelectSysTree from './SelectSysTree';
import SelectSysList from './SelectSysList';
import SelectParams from './SelectParams';
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
  },
  utils
} = $p;
const _obj = templates._select_template;
const empty_hierarchy = vh.get();

var _ref = /*#__PURE__*/React.createElement(Typography, {
  variant: "body2",
  color: "primary"
}, "Можно перезаполнить параметры по системе, либо сохранить параметры, заданные в изделии-шаблоне");

var _ref2 = /*#__PURE__*/React.createElement(Grid, {
  item: true,
  xs: 12,
  sm: 5
}, /*#__PURE__*/React.createElement(SelectParams, {
  _obj: _obj
}));

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
  return [/*#__PURE__*/React.createElement(Grid, {
    key: "block",
    container: true,
    spacing: 1,
    className: classes.label
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: 3,
    sm: 2
  }, /*#__PURE__*/React.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: _obj.base_block.svg ? utils.scale_svg(_obj.base_block.svg, {
        width: 90,
        height: 90,
        zoom: 0.2
      }, 0) : 'нет эскиза'
    }
  })), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: 9,
    sm: 10
  }, _ref, /*#__PURE__*/React.createElement(TextField, {
    InputProps: {
      readOnly: true
    },
    label: "Типовой блок",
    value: _obj.base_block.toString(),
    fullWidth: true
  }), /*#__PURE__*/React.createElement(Typography, {
    variant: "body2",
    color: "primary",
    className: classes.top
  }, "Можно сохранить систему типового блока, либо выбрать другую"), /*#__PURE__*/React.createElement(FormControlLabel, {
    labelPlacement: "start",
    className: classes.label,
    control: /*#__PURE__*/React.createElement(Switch, {
      checked: refill,
      onChange: refillChange,
      value: "refill"
    }),
    label: `Задействовать параметры ${refill ? 'системы' : 'изделия'}`
  }))), /*#__PURE__*/React.createElement(TextField, {
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
    sm: 3
  }, /*#__PURE__*/React.createElement(SelectSysTree, {
    group: group.valueOf(),
    set_group: groupChange
  })), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: 12,
    sm: 4
  }, /*#__PURE__*/React.createElement(SelectSysList, {
    group: group,
    sys: sys,
    _obj: _obj,
    set_sys: sysChange,
    handleNext: handleNext
  })), _ref2)];
}