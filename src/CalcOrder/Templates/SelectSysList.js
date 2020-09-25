import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  list: {
    maxHeight: '40vh',
    overflow: 'auto',
  },
});


const {cat: {production_params}, utils} = $p;

export default function SelectSysList({group, sys, _obj, set_sys, handleNext}) {

  const [cond] = _obj.permitted_sys(_obj.calc_order);
  const rows = [];
  production_params.forEach((v) => {
    if(cond && !utils._selection(v, {[cond.name]: cond.path})) {
      return ;
    }
    if(v.extra_fields._obj.find(({value}) => value == group)) {
      rows.push(v);
    }
  });

  rows.sort((a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });

  const classes = useStyles();

  return (
    <div className={classes.list}>
      <List component="nav" >
        {rows.map((v) =>
          <ListItem
            key={v.ref}
            button
            selected={v == sys}
            onClick={() => set_sys(v)}
            onDoubleClick={() => {
              set_sys(v);
              handleNext();
            }}
            classes={{root: classes.root}}
          >
            <ListItemText primary={v.name} />
          </ListItem>)}
      </List>
    </div>
  );
}
