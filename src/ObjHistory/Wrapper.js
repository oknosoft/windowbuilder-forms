import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from 'metadata-react/App/Dialog';
import ObjHistory from './ObjHistory';

export default function (props) {

  const {dialog: {_mgr, cmd, ref}, handlers}  = props;
  const obj = _mgr.get(ref);

  function handleCancel() {
    handlers.handleIfaceState({
      component: cmd.area || 'DataObjPage',
      name: 'dialog',
      value: null,
    });
  };

  return <Dialog
    open
    initFullScreen
    large
    title={`История изменений '${obj}'`}
    onClose={handleCancel}
    actions={[
      <Button key="cancel" onClick={handleCancel} color="primary">Закрыть</Button>
    ]}
  >
    <ObjHistory obj={obj} _mgr={_mgr} {...cmd} />
  </Dialog>;
}
