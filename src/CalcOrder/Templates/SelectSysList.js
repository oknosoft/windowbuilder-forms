import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function SelectSysList({classes, sys_rows, group, sys, _obj, set_sys, handleNext}) {

  const [cond] = _obj.permitted_sys(_obj.calc_order);
  const rows = sys_rows.filter((v) => v.extra_fields._obj.find(({value}) => value == group));

  rows.sort((a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });

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
