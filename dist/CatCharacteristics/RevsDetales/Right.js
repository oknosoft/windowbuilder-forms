import React from 'react';
import PropTypes from 'prop-types';
import DataGrid from 'react-data-grid';
import Spec from '../LazySpec';
export const PropFormatter = ({
  value
}) => {
  const res = value ? value.presentation : '';
  return res || null;
};
const EmptyRowsView = classes => () => /*#__PURE__*/React.createElement("div", {
  className: classes.empty
}, "Укажите строку версии продукции (слева)");
const columns_prop = [{
  key: 'cnstr',
  name: 'Слой',
  width: 70,
  resizable: true
}, {
  key: 'param',
  name: 'Параметр',
  resizable: true,
  formatter: PropFormatter
}, {
  key: 'value',
  name: 'Значение',
  resizable: true,
  formatter: PropFormatter
}];
export default function Right({
  params,
  specification,
  classes,
  tab,
  setTab
}) {
  const _obj = tab === 1 && $p.cat.characteristics.create({
    specification
  }, false, true);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 'calc(100% - 32px)'
    }
  }, tab === 0 && /*#__PURE__*/React.createElement(DataGrid, {
    columns: columns_prop,
    rowGetter: i => params[i],
    rowsCount: params.length,
    emptyRowsView: EmptyRowsView(classes)
  }), tab === 1 && /*#__PURE__*/React.createElement(Spec, {
    _obj: _obj
  }));
}