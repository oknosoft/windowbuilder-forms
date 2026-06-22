import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import qs from 'qs';

import {steps, stepContent} from './stepContent';
import CloseBtn from 'metadata-react/App/CloseButton';
import StepLabelText from './StepLabel';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginTop: theme.spacing(),
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  pointer: {
    cursor: 'pointer !important',
  },
  flex: {
    display: 'flex',
  },
  full: {
    flex: 1,
  }
}));

export default function TemplatesFrameInline(props) {
  const classes = useStyles();
  let [activeStep, setActiveStep] = React.useState(1);
  const [list, set_list] = React.useState('');
  const {cat: {templates}, ui: {dialogs}, utils} = $p;

  const handleNext = () => {
    if(activeStep === 0 && templates._select_template.calc_order.empty()) {
      return dialogs.alert({text: `Не выбран заказ-шаблон`, title: 'Пустой заказ'});
    }
    if([1, 2].includes(activeStep) && templates._select_template.base_block.empty()) {
      return dialogs.alert({text: `Не выбрано изделие-шаблон`, title: 'Пустой шаблон'});
    }
    if(activeStep === steps.length - 1) {
      if(templates._select_template.refill && templates._select_template.base_block.empty()) {
        return dialogs.alert({text: `Взведён признак перезаполнить по системе, но система не выбрана`, title: 'Пустая система'});
      }
      props.handleOk(templates._select_template.base_block);
    }
    setActiveStep(prevStep => prevStep + 1);
  };

  const handleBack = () => {
    if(activeStep === 0) {
      return props.handleCancel();
    }
    setActiveStep(prevStep => prevStep - 1);
  };

  return (
    <Stepper activeStep={activeStep} orientation="vertical">
      {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel
            classes={{root: classes.pointer, label: classes.flex}}
            onClick={() => setActiveStep(index)}
          >
            <StepLabelText classes={classes} index={index} templates={templates} label={label}/>
            {index === 0 && <CloseBtn handleClose={() => {
              activeStep = 0;
              handleBack();
            }}/>}
          </StepLabel>
          <StepContent>
            {stepContent(index, {handleNext, handleBack, list, set_list, props})}
            <div className={classes.actionsContainer}>
              <div className={classes.flex}>
                <Button
                  onClick={handleBack}
                  className={classes.button}
                >
                  {activeStep === 0 ? 'Отмена' : 'Назад'}
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                  disabled={Boolean(list)}
                >
                  {activeStep === steps.length - 1 ? 'Завершить' : 'Далее'}
                </Button>
              </div>
            </div>
          </StepContent>
        </Step>
      ))}
    </Stepper>
  );
}

