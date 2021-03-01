import React from 'react';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import SelectSysTree from './SelectSysTree';
import SelectSysList from './SelectSysList';
import SelectParams from './SelectParams';

const useStyles = makeStyles(theme => ({
  label: {
    marginLeft: 0,
  },
  top: {
    marginTop: theme.spacing(),
  },
  root: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  list: {
    maxHeight: '36vh',
    overflow: 'auto',
  },
  text: {
    marginTop: theme.spacing(),
    width: '90%',
  }
}));

const {cat: {templates, property_values_hierarchy: vh, production_params}, utils, job_prm} = $p;
const _obj = templates._select_template;
const empty_hierarchy = vh.get();

const sys_rows = () => {
  const [cond] = _obj.permitted_sys();
  const sys = job_prm.builder && job_prm.builder.branch_filter && job_prm.builder.branch_filter.sys;

  const rows = [];
  production_params.forEach((v) => {
    if(v.is_folder || (cond && !utils._selection(v, {[cond.name]: cond.path}))) {
      return ;
    }
    if(sys && sys.length && !sys.some((bs) => {
      return v === bs || v._hierarchy(bs);
    })) {
      return ;
    }
    rows.push(v);
  });
  return rows;
};

export default function SelectSys({handleNext}) {

  const [cond] = _obj.permitted_sys();
  const lock = cond && cond.path.inh.length === 1;
  if(lock && _obj.refill) {
    _obj.refill = false;
  }
  const [refill, set_refill] = React.useState(_obj.refill);
  const [sys, set_sys] = React.useState(_obj.sys);
  const [group, set_group] = React.useState(_obj.sys._extra('sys_hierarchy') || empty_hierarchy);

  const refillChange = ({target}) => {
    _obj.refill = target.checked;
    set_refill(target.checked);
  };

  const groupChange = (e, v) => {
    set_group(vh.get(v));
  };

  const sysChange = (v) => {
    _obj.sys = v;
    set_sys(v);
  };

  const classes = useStyles();
  const rows = sys_rows();

  return [
    <Grid key="block" container spacing={1} className={classes.label}>
      <Grid item xs={3} sm={2}>
        <div dangerouslySetInnerHTML={{
          __html: _obj.base_block.svg ? utils.scale_svg(_obj.base_block.svg, {width: 90, height: 90, zoom: 0.2}, 0) : 'нет эскиза'
        }}/>
      </Grid>
      <Grid item xs={9} sm={10}>
        <Typography variant="body2" color="primary">
          Можно перезаполнить параметры по системе, либо сохранить параметры, заданные в изделии-шаблоне
        </Typography>
        <TextField
          InputProps={{
            readOnly: true,
          }}
          label="Типовой блок"
          value={_obj.base_block.toString()}
          fullWidth
        />
        <Typography variant="body2" color="primary" className={classes.top}>
          {lock ? 'Будет использована система и параметры шаблона' : 'Можно сохранить систему типового блока, либо выбрать другую'}
        </Typography>
        <FormControlLabel
          labelPlacement="start"
          className={classes.label}
          control={<Switch checked={refill} disabled={lock} onChange={refillChange} value="refill" />}
          label={'Задействовать параметры системы'}
        />
      </Grid>
    </Grid>,
    <TextField
      key="sys"
      InputProps={{
        readOnly: true,
      }}
      label="Система"
      value={sys.toString()}
      fullWidth
    />,
    refill &&
      <Grid key="select_sys" container spacing={1} className={classes.label}>
        <Grid item xs={12} sm={3}>
          <SelectSysTree
            classes={classes}
            group={group.valueOf()}
            sys_rows={rows}
            set_group={groupChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <SelectSysList
            classes={classes}
            sys_rows={rows}
            group={group}
            sys={sys}
            _obj={_obj}
            set_sys={sysChange}
            handleNext={handleNext}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <SelectParams _obj={_obj} sys={sys} />
        </Grid>
      </Grid>,
  ];
}
