var _ToggleButton, _ToggleButton2;
import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
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
  }, _ToggleButton || (_ToggleButton = /*#__PURE__*/React.createElement(ToggleButton, {
    value: 0
  }, "Парам")), _ToggleButton2 || (_ToggleButton2 = /*#__PURE__*/React.createElement(ToggleButton, {
    value: 1
  }, "Спец")));
}