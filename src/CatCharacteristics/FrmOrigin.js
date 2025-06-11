import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import DataObj from 'metadata-react/FrmObj/DataObj';
import withStyles from 'metadata-react/styles/paper600';
const FrmObj = withStyles(DataObj);

function handleClick(owner, origin) {
  owner.row = {origin};
  owner.fld = 'origin';
  owner.setState({open: 1});
}

function CompositeOrigin(composite, owner) {

  function Detail(raw) {
    const [type, ref, rNum] = raw.split('|');
    const mgr = $p.cat[type.startsWith('ins') ? 'inserts' : (type.startsWith('f') ? 'furns' : 'cnns')];
    const origin = mgr.get(ref);
    const row = origin.specification.get(rNum - 1);
    return <ListItem button onClick={() => handleClick(owner, origin)}>
      <ListItemAvatar>
        <Avatar>{type[0].toUpperCase()}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={origin.name} secondary={`Строка №${rNum}, ${row.nom.name}`} />
    </ListItem>;
  }

  return <List>{composite.map(Detail)}</List>;
}

export default function FrmOrigin({origin, owner}) {
  if(typeof origin === 'string' && origin.startsWith('[')) {
    return CompositeOrigin(JSON.parse(origin), owner);
  }
  else {
    return <FrmObj
      _mgr={origin._manager}
      _acl="r"
      match={{params: {ref: origin.ref}}}
      handlers={{}}
    />
  }
}
