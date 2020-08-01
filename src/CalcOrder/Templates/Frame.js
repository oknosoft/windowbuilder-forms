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

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

const prm = () => qs.parse(location.search.replace('?',''));

function TemplatesFrame(props) {
  const classes = useStyles();
  let {order, ref, step, action = 'refill'} = prm();
  const [activeStep, setActiveStep] = React.useState(step ? 1 : 0);
  const [list, set_list] = React.useState('');

  const handleNext = () => {
    const {cat: {templates}, ui: {dialogs}, utils} = $p;
    if(activeStep === 0 && templates._select_template.calc_order.empty()) {
      return dialogs.alert({text: `Не выбран заказ-шаблон`, title: 'Пустой заказ'});
    }
    if(activeStep === 1 && templates._select_template.base_block.empty()) {
      return dialogs.alert({text: `Не выбрано изделие-шаблон`, title: 'Пустой шаблон'});
    }
    if(activeStep === steps.length - 1) {
      if(templates._select_template.refill && templates._select_template.base_block.empty()) {
        return dialogs.alert({text: `Взведён признак перезаполнить по системе, но система не выбрана`, title: 'Пустая система'});
      }
      if(!order) {
        return dialogs.alert({text: `Не задан заказ назначения в url`, title: 'Пустой заказ'});
      }
      if(!utils.is_guid(ref)) {
        action = 'new';
        ref = utils.generate_guid();
      }
      props.handleNavigate(`/builder/${ref}?order=${order}&action=${action}`);
    }
    setActiveStep(prevStep => prevStep + 1);
  };

  const handleBack = () => {
    if(activeStep === 0) {
      return props.history.goBack();
    }
    setActiveStep(prevStep => prevStep - 1);
  };

  return (
    <Stepper activeStep={activeStep} orientation="vertical">
      {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
          <StepContent>
            {stepContent(index, {handleNext, handleBack, list, set_list, props})}
            <div className={classes.actionsContainer}>
              <div>
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

TemplatesFrame.propTypes = {
  history: PropTypes.object.isRequired,
  handleNavigate: PropTypes.func.isRequired,
};

export default TemplatesFrame;
