import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

export default function SelectSysList({classes, sys_rows, group, sys, _obj, set_sys, handleNext}) {

  const [filter, set_filter] = React.useState('');
  const [cond] = _obj.permitted_sys();
  const rows = sys_rows.filter((v) => {
    if(filter) {
      const selection = {
        _search: {
          fields: ['name', 'id'],
          value: filter.split(' '),
        }
      }
      if (!$p.utils._selection.call(this, v, selection)) {
        return false;
      }
    }
    return v.extra_fields._obj.find(({value}) => value == group);
  });

  rows.sort((a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });

  return (
    <>
      <TextField
        className={classes.text}
        label="Фильтр"
        value={filter}
        onChange={({target}) => set_filter(target.value)}
        InputProps={{endAdornment: <InputAdornment position="end"><SearchIcon /></InputAdornment>}}
      />
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
    </>
  );
}
