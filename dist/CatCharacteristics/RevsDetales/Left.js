import React from 'react';
import PropTypes from 'prop-types';
import DataGrid from 'react-data-grid';
import { DateFormatter, NomFormatter } from '../../CalcOrder/RevsDetales';

const ClrFormatter = ({
  value
}) => {
  const clr = $p.cat.clrs.get(value);
  return clr.presentation;
};

const columns_doc = [{
  key: 'date',
  name: 'Дата',
  width: 140,
  resizable: true,
  formatter: DateFormatter
}, {
  key: 'user',
  name: 'Автор',
  resizable: true
}, {
  key: 'owner',
  name: 'Номенклатура',
  resizable: true,
  formatter: NomFormatter
}, {
  key: 'clr',
  name: 'Цвет',
  width: 90,
  resizable: true,
  formatter: ClrFormatter
}, {
  key: 'x',
  name: 'X',
  width: 60,
  resizable: true
}, {
  key: 'y',
  name: 'Y',
  width: 60,
  resizable: true
}, {
  key: 's',
  name: 'S',
  width: 60,
  resizable: true
}];
export default function Left({
  rows,
  svg,
  set_params
}) {
  const __html = svg ? $p.utils.scale_svg(svg, 240, 0) : '';

  return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(DataGrid, {
    columns: columns_doc,
    rowGetter: i => rows[i],
    rowsCount: rows.length,
    onCellSelected: set_params
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    },
    dangerouslySetInnerHTML: {
      __html
    }
  }));
}