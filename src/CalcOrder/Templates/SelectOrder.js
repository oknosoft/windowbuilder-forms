import React from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import NextWeekIcon from '@material-ui/icons/NextWeek';
import WorkIcon from '@material-ui/icons/Work';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from '@material-ui/core/styles';

import Tip from 'metadata-react/App/Tip';
import CloseBtn from 'metadata-react/App/CloseButton';
import DirectList from 'metadata-react/DynList/DynList';
import QuickFilter from '../FrmList/QuickFilter';

const {cat: {templates, scheme_settings}, doc: {calc_order: _mgr}} = $p;

const _obj = templates._select_template;
const schemas = {};
const modes = {list: '', templates: 'ram'};

scheme_settings.find_rows({obj: 'doc.calc_order'}, (scheme) => {
  if(scheme.name.endsWith('main')) {
    schemas.list = scheme;
    scheme.set_standard_period(true);
  }
  else if(scheme.name.endsWith('templates')) {
    schemas.templates = scheme;
  }
});

const styles = ((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  flex: {
    flex: 1,
  },
}));

class SelectOrder extends React.Component {

  state = {backdrop: false, handleFilterChange: null};

  registerFilterChange = (handleFilterChange) => {
    if(this.state.handleFilterChange !== handleFilterChange) {
      this.setState({handleFilterChange});
    }
  };

  render() {
    const {props: {
      list,
      set_list,
      handleNext,
      classes,
      props: {handleNavigate, handleIfaceState, title},
    }, state: {backdrop, handleFilterChange}} = this;

    const {calc_order} = _obj;
    const text = `${calc_order.number_doc} (${calc_order.note})`;
    const reset_list = () => {
      this.setState({backdrop: false});
      set_list('');
    };

    const setBackdrop = () => {
      this.setState({backdrop: true});
    };

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
        frm_key={list}
        selectionMode
        denyAddDel
        read_only
        setting_in_menu
        hide_edit
        show_variants={false}
        _mgr={_mgr}
        scheme={schemas[list]}
        source_mode={modes[list]}
        handlers={{
          handleSelect(doc) {
            setBackdrop();
            _mgr.create(doc)
              .then((doc) => {
                _obj.calc_order = doc;
                return list === 'templates' ? doc.load_templates() : doc.load_linked_refs();
              })
              .then(reset_list)
              .then(handleNext)
              .catch(reset_list);
          },
          handleNavigate,
          handleIfaceState,
        }}
        handleNavigate={handleNavigate}
        handleIfaceState={handleIfaceState}
        title={title}
        registerFilterChange={this.registerFilterChange}
        btns={<QuickFilter
          scheme={schemas[list]}
          _mgr={_mgr}
          handleFilterChange={handleFilterChange}
          frm_key={list}
        />}
        alter_end_btns={<CloseBtn handleClose={reset_list}/>}
      />,
      <Backdrop key="backdrop" className={classes.backdrop} open={backdrop} >
        Загрузка продукций...
        <CircularProgress color="inherit" />
      </Backdrop>

    ];
  }
}

export default withStyles(styles)(SelectOrder);
