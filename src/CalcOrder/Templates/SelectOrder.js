import React from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import NextWeekIcon from '@material-ui/icons/NextWeek';
import WorkIcon from '@material-ui/icons/Work';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import Tip from '../../Common/Tip';
import CloseBtn from '../../Common/CloseBtn';
//import DirectList from '../FrmList/DirectList';
import DirectList from 'metadata-react/DynList';

const _obj = $p.cat.templates._select_template;
const schemas = {};
const modes = {list: '', templates: 'ram'};

$p.cat.scheme_settings.find_rows({obj: 'doc.calc_order'}, (scheme) => {
  if(scheme.name.endsWith('main')) {
    schemas.list = scheme;
    scheme.set_standard_period(true);
  }
  else if(scheme.name.endsWith('templates')) {
    schemas.templates = scheme;
  }
});

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  flex: {
    flex: 1,
  },
}));

export default function SelectOrder({list, set_list, handleNext}) {

  const [backdrop, set_backdrop] = React.useState(false);
  const {calc_order} = _obj;
  const text = `${calc_order.number_doc} (${calc_order.note})`;
  const reset_list = () => {
    set_backdrop(false);
    set_list('');
  };
  const classes = useStyles();
  return [
    <Typography key="descr" variant="body2" color="primary">
      Изделия-шаблоны, живут в специальных заказах со статусом <i>Шаблон</i>.<br/>
      По умолчанию, выбор происходит из последнего открытого заказа-шаблона.
      При желании, изделие можно заполнить по образу любого изделия из любого заказа - не обязательно шаблона.
    </Typography>,
    !list && <Toolbar key="bar" disableGutters variant="dense">
      <TextField
        disabled
        label="Заказ-шаблон"
        defaultValue={text}
        className={classes.flex}
      />
      <Tip title="Выбрать шаблон">
        <IconButton onClick={() => set_list('templates')} ><NextWeekIcon /></IconButton>
      </Tip>
      <Tip title="Выбрать из полного списка заказов">
        <IconButton onClick={() => set_list('list')} ><WorkIcon /></IconButton>
      </Tip>
    </Toolbar>,
    Boolean(list) &&
      <DirectList
        key="list"
        frm_key={`templates-${list}`}
        selectionMode
        denyAddDel
        read_only
        show_variants={false}
        _mgr={$p.doc.calc_order}
        scheme={schemas[list]}
        source_mode={modes[list]}
        handlers={{
          handleSelect(doc) {
            set_backdrop(true);
            $p.doc.calc_order.create(doc)
              .then((doc) => {
                _obj.calc_order = doc;
                return doc.load_linked_refs();
              })
              .then(reset_list)
              .then(handleNext)
              .catch(reset_list);
          }
        }}
        alter_end_btns={<CloseBtn handleClose={reset_list}/>}
      />,
    <Backdrop key="backdrop" className={classes.backdrop} open={backdrop} >
      Загрузка продукций...
      <CircularProgress color="inherit" />
    </Backdrop>


  ];
}
