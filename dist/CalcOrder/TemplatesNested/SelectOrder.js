/**
 * Выбор заказа шаблонов вложенного изделия
 */
import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

var _ref = /*#__PURE__*/React.createElement(Typography, null, "Не заполнена константа ", /*#__PURE__*/React.createElement("b", null, "templates_nested"));

var _ref2 = /*#__PURE__*/React.createElement(InputLabel, null, "Расчет-заказ шаблонов");

export default function SelectOrder({
  onChange,
  _obj,
  templates_nested
}) {
  if (!templates_nested || !templates_nested.length) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, _ref);
  }

  if (templates_nested.length === 1) {
    if (_obj.calc_order != templates_nested[0]) {
      _obj.calc_order = templates_nested[0];
      Promise.resolve().then(() => onChange(_obj.calc_order));
    }

    return null;
  }

  return /*#__PURE__*/React.createElement(FormControl, {
    fullWidth: true,
    title: "Укажите заказ"
  }, _ref2, /*#__PURE__*/React.createElement(Select, {
    value: templates_nested.includes(_obj.calc_order.ref) ? _obj.calc_order.ref : '',
    onChange: ({
      target
    }) => {
      _obj.calc_order = target.value;
      onChange(_obj.calc_order);
    }
  }, templates_nested.map((order, index) => /*#__PURE__*/React.createElement(MenuItem, {
    key: `o-${index}`,
    value: order.ref
  }, /*#__PURE__*/React.createElement(Typography, {
    component: "span"
  }, `${order.note} \u00A0`), /*#__PURE__*/React.createElement(Typography, {
    component: "span",
    variant: "caption"
  }, ` ${order.number_doc}`)))));
}