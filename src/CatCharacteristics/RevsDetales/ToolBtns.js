import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

export default function ToolBtns({setTab, tab}) {

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return <ToggleButtonGroup
    value={tab}
    exclusive
    onChange={handleChange}
  >
    <ToggleButton value={0}>
      Парам
    </ToggleButton>
    <ToggleButton value={1}>
      Спец
    </ToggleButton>
  </ToggleButtonGroup>;
}
