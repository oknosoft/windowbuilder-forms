import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from 'metadata-react/App/Dialog';
import ObjHistory from './ObjHistory';

const defaultCloseText = 'Закрыть';

export default function (props) {

  const {dialog: {_mgr, cmd, ref}, handlers}  = props;
  const obj = _mgr.get(ref);

  const [close, setClose] = React.useState({handler: null, text: ''});
  const [toolbtns, setToolBtns] = React.useState(null);

  function handleCancel() {
    const stop = close.handler ? close.handler({_mgr, cmd, ref, handlers}) === false : false;
    !stop && handlers.handleIfaceState({
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
    toolbtns={toolbtns}
    actions={[
      <Button key="cancel" onClick={handleCancel} color="primary">{close.text || defaultCloseText}</Button>
    ]}
  >
    <ObjHistory obj={obj} _mgr={_mgr} {...cmd} setClose={setClose} setToolBtns={setToolBtns}/>
  </Dialog>;
}
