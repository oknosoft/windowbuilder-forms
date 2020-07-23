import React from 'react';
import SelectOrder from './SelectOrder';
import SelectFigure from './SelectFigure';
import SelectSys from './SelectSys';
import SelectTemplate from './SelectTemplate';

export const steps = ['Выбор заказа', 'Выбор формы изделия', 'Уточнить систему' /*, 'Уточнить шаблон' */];

export function stepContent(step, props) {
  switch (step) {
  case 0:
    return <SelectOrder {...props}/>;
  case 1:
    return <SelectFigure {...props}/>;
  case 2:
    return <SelectSys {...props}/>;
  case 3:
    return <SelectTemplate {...props}/>;
  default:
    return 'Unknown step';
  }
}
