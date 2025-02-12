var _Typography;
import React from 'react';
import Typography from '@material-ui/core/Typography';
import TemplateRow from './TemplateRow';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  cont: {
    maxHeight: 'calc(60vh)',
    overflow: 'auto'
  }
});
const _obj = $p.cat.templates._select_template;
export default function SelectFigure({
  handleNext
}) {
  const [base_block, set_base_block] = React.useState(_obj.base_block);
  const handleSelect = base_block => () => {
    _obj.base_block = base_block;
    set_base_block(base_block);
  };
  const res = [];
  _obj.calc_order.production.forEach(row => {
    const {
      owner,
      calc_order,
      coordinates
    } = row.characteristic;
    if (row.characteristic.empty() || calc_order.empty() || owner.is_procedure || owner.is_accessory) {
      return;
    }
    // это изделие построителя
    coordinates.count() && res.push(/*#__PURE__*/React.createElement(TemplateRow, {
      key: `tr-${row.row}`,
      row: row,
      handleSelect: handleSelect(row.characteristic),
      handleNext: handleNext,
      selected: row.characteristic === base_block
    }));
  });
  const classes = useStyles();
  return [_Typography || (_Typography = /*#__PURE__*/React.createElement(Typography, {
    key: "descr",
    variant: "body2",
    color: "primary"
  }, "Выберите изделие, форма которого будет применена")), /*#__PURE__*/React.createElement("div", {
    key: "products",
    className: classes.cont
  }, res)];
}