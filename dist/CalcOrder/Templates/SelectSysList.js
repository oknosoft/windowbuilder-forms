import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

var _ref = /*#__PURE__*/React.createElement(InputAdornment, null, /*#__PURE__*/React.createElement(SearchIcon, null));

export default function SelectSysList({
  classes,
  sys_rows,
  group,
  sys,
  _obj,
  set_sys,
  handleNext
}) {
  const [filter, set_filter] = React.useState('');

  const [cond] = _obj.permitted_sys();

  const rows = sys_rows.filter(v => {
    if (filter) {
      const selection = {
        _search: {
          fields: ['name', 'id'],
          value: filter.split(' ')
        }
      };

      if (!$p.utils._selection.call(this, v, selection)) {
        return false;
      }
    }

    return v.extra_fields._obj.find(({
      value
    }) => value == group);
  });
  rows.sort((a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TextField, {
    className: classes.text,
    label: "Фильтр",
    value: filter,
    onChange: ({
      target
    }) => set_filter(target.value),
    InputProps: {
      endAdornment: _ref
    }
  }), /*#__PURE__*/React.createElement("div", {
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
  }))))));
}