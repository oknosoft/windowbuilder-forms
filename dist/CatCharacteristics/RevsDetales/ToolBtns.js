import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

var _ref = /*#__PURE__*/React.createElement(ToggleButton, {
  value: 0
}, "Парам");

var _ref2 = /*#__PURE__*/React.createElement(ToggleButton, {
  value: 1
}, "Спец");

export default function ToolBtns({
  setTab,
  tab
}) {
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return /*#__PURE__*/React.createElement(ToggleButtonGroup, {
    value: tab,
    exclusive: true,
    onChange: handleChange
  }, _ref, _ref2);
}