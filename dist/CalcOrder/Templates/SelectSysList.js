import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
const {
  cat: {
    production_params
  },
  utils
} = $p;
export default function SelectSysList({
  classes,
  group,
  sys,
  _obj,
  set_sys,
  handleNext
}) {
  const [cond] = _obj.permitted_sys(_obj.calc_order);

  const rows = [];
  production_params.forEach(v => {
    if (cond && !utils._selection(v, {
      [cond.name]: cond.path
    })) {
      return;
    }

    if (v.extra_fields._obj.find(({
      value
    }) => value == group)) {
      rows.push(v);
    }
  });
  rows.sort((a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });
  return /*#__PURE__*/React.createElement("div", {
    className: classes.list
  }, /*#__PURE__*/React.createElement(List, {
    component: "nav"
  }, rows.map(v => /*#__PURE__*/React.createElement(ListItem, {
    key: v.ref,
    button: true,
    selected: v == sys,
    onClick: () => set_sys(v),
    onDoubleClick: () => {
      set_sys(v);
      handleNext();
    },
    classes: {
      root: classes.root
    }
  }, /*#__PURE__*/React.createElement(ListItemText, {
    primary: v.name
  })))));
}