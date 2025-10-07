var _br;
import React from 'react';
export default function StepLabelText({
  classes,
  label,
  index,
  templates
}) {
  const {
    calc_order
  } = templates._select_template;
  return /*#__PURE__*/React.createElement("div", {
    className: classes.full
  }, index === 0 && calc_order ? /*#__PURE__*/React.createElement(React.Fragment, null, label, _br || (_br = /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("span", {
    style: {
      cursor: 'pointer',
      textDecoration: 'underline',
      fontWeight: 400
    },
    onClick: ev => {
      navigator.clipboard.writeText(calc_order.ref);
      ev.preventDefault();
      ev.stopPropagation();
    }
  }, `${calc_order.number_doc} (${calc_order.note})`)) : label);
}