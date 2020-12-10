import React from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
const {
  cch: {
    properties
  },
  cat: {
    property_values_hierarchy: vh
  }
} = $p;
const hierarchy = properties.predefined('sys_hierarchy');
const defaultExpanded = vh.find_rows({
  owner: hierarchy,
  parent: vh.get()
}).map(v => v.ref);

const renderItems = parent => {
  if (!parent) {
    parent = vh.get();
  }

  return vh.find_rows({
    owner: hierarchy,
    parent
  }).filter(v => {
    if (parent.empty()) {
      let ok;
      vh.find_rows({
        owner: hierarchy,
        parent: v
      }, sub => {
        if (groups.has(sub)) {
          ok = true;
          return false;
        }
      });
      return ok;
    }

    return groups.has(v);
  }).map(v => {
    return /*#__PURE__*/React.createElement(TreeItem, {
      key: v.ref,
      nodeId: v.ref,
      label: v.name
    }, renderItems(v));
  });
};

const groups = new Set();

var _ref = /*#__PURE__*/React.createElement(ExpandMoreIcon, null);

var _ref2 = /*#__PURE__*/React.createElement(ChevronRightIcon, null);

export default function SelectSysTree({
  classes,
  sys_rows,
  group,
  set_group
}) {
  groups.clear();
  sys_rows.forEach(({
    extra_fields
  }) => {
    const row = extra_fields.find({
      property: hierarchy
    });

    if (row) {
      groups.add(row.value);
    }
  });
  return /*#__PURE__*/React.createElement("div", {
    className: classes.list
  }, /*#__PURE__*/React.createElement(TreeView, {
    defaultCollapseIcon: _ref,
    defaultExpandIcon: _ref2,
    defaultExpanded: defaultExpanded,
    onNodeSelect: set_group,
    selected: group
  }, renderItems()));
}