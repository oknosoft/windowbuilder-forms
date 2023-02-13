var _Button;
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import SelectOrder from './SelectOrder';
import SelectFigure from 'wb-forms/dist/CalcOrder/Templates/SelectFigure';
const {
  cat: {
    templates
  },
  job_prm
} = $p;
const _obj = templates._select_template;
const {
  templates_nested
} = job_prm.builder;
function TemplatesFrame(props) {
  const [order, setOrder] = React.useState(_obj.calc_order); /* eslint-disable-line */
  const orderChange = order => {
    setOrder(order);
  };
  const handleFin = () => {
    if (_obj.base_block.empty() || _obj.base_block.calc_order !== _obj.calc_order) {
      return alert('Не выбрано изделие-шаблон');
    }
    props.handleOk(true);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SelectOrder, {
    _obj: _obj,
    onChange: orderChange,
    templates_nested: templates_nested
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 8
    }
  }, /*#__PURE__*/React.createElement(SelectFigure, {
    handleNext: handleFin
  })), /*#__PURE__*/React.createElement(DialogActions, null, _Button || (_Button = /*#__PURE__*/React.createElement(Button, {
    variant: "contained",
    disabled: true
  }, "Назад")), /*#__PURE__*/React.createElement(Button, {
    variant: "contained",
    color: "primary",
    onClick: handleFin
  }, "Ок"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  })));
}
export default TemplatesFrame;