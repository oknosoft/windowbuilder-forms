/**
 * Строка заказа с указанием шаблона или номенклатуры, цвета, размеров
 *
 * @module TemplateRow
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/List';
import Checkbox from '@material-ui/core/Checkbox';
import withStyles from '../FrmObj/styles';
function TemplateRow({
  row,
  classes,
  handleSelect,
  handleNext,
  selected
}) {
  const {
    nom,
    characteristic: ox
  } = row;
  const {
    scale_svg
  } = $p.utils;
  return /*#__PURE__*/React.createElement(ListItem, {
    className: classes.hovered,
    onClick: handleSelect,
    onDoubleClick: () => {
      handleSelect();
      handleNext();
    }
  }, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    className: classes.left
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: 4,
    sm: 3
  }, /*#__PURE__*/React.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: ox.svg ? scale_svg(ox.svg, {
        width: 330,
        height: 140,
        zoom: 0.2
      }, 0) : 'нет эскиза'
    }
  })), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: 7,
    sm: 8
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "h6"
  }, row.note || 'Без названия'), /*#__PURE__*/React.createElement(Typography, {
    variant: "body2"
  }, `Ширина: ${ox.x}, Высота: ${ox.y}, Площадь: ${ox.s}`)), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: 1
  }, /*#__PURE__*/React.createElement(Checkbox, {
    checked: selected,
    onChange: handleSelect,
    value: "primary"
  }))));
}
export default withStyles(TemplateRow);