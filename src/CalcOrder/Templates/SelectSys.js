import React from 'react';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DataField from 'metadata-react/DataField';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  label: {
    marginLeft: 0,
  },
});

const _obj = $p.cat.templates._select_template;

export default function SelectSys() {

  const [refill, set_refill] = React.useState(_obj.refill);

  const refillChange = ({target}) => {
    _obj.refill = target.checked;
    set_refill(target.checked);
  };

  const classes = useStyles();

  return [
    <Typography key="descr1" variant="body2" color="primary">
      Можно перезаполнить параметры по системе, либо сохранить параметры, заданные в изделии-шаблоне
    </Typography>,
    <Typography key="descr2" variant="body2" color="primary">
      Можно сохранить систему типового блока, либо выбрать другую
    </Typography>,
    <DataField key="base_block" _obj={_obj} _fld="base_block" fullWidth read_only/>,
    <FormControlLabel
      key="refill"
      labelPlacement="start"
      className={classes.label}
      control={<Switch checked={refill} onChange={refillChange} value="refill" />}
      label={`Задействовать параметры ${refill ? 'системы' : 'изделия'}`}
    />,
    <DataField key="sys" _obj={_obj} _fld="sys" fullWidth read_only={!refill}/>
  ];
}
