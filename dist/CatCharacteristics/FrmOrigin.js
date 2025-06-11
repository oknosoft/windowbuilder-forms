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
  owner.row = {
    origin
  };
  owner.fld = 'origin';
  owner.setState({
    open: 1
  });
}
function CompositeOrigin(composite, owner) {
  function Detail(raw) {
    const [type, ref, rNum] = raw.split('|');
    const mgr = $p.cat[type.startsWith('ins') ? 'inserts' : type.startsWith('f') ? 'furns' : 'cnns'];
    const origin = mgr.get(ref);
    const row = origin.specification.get(rNum - 1);
    return /*#__PURE__*/React.createElement(ListItem, {
      button: true,
      onClick: () => handleClick(owner, origin)
    }, /*#__PURE__*/React.createElement(ListItemAvatar, null, /*#__PURE__*/React.createElement(Avatar, null, type[0].toUpperCase())), /*#__PURE__*/React.createElement(ListItemText, {
      primary: origin.name,
      secondary: `Строка №${rNum}, ${row.nom.name}`
    }));
  }
  return /*#__PURE__*/React.createElement(List, null, composite.map(Detail));
}
export default function FrmOrigin({
  origin,
  owner
}) {
  if (typeof origin === 'string' && origin.startsWith('[')) {
    return CompositeOrigin(JSON.parse(origin), owner);
  } else {
    return /*#__PURE__*/React.createElement(FrmObj, {
      _mgr: origin._manager,
      _acl: "r",
      match: {
        params: {
          ref: origin.ref
        }
      },
      handlers: {}
    });
  }
}