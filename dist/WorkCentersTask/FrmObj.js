var _Helmet, _Tab, _Tab2, _Tab3, _Tab4, _Tab5, _Tab6, _IconClose, _LoadingMessage, _IconButton, _IconEvent, _IconButton2, _IconRotate, _LoadingMessage2;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
/**
 * Форма документа Задание на производство
 *
 * @module FrmObj
 *
 * Created by Evgeniy Malyarov on 24.09.2018.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Tab from '@material-ui/core/Tab';
import { Helmet } from 'react-helmet';
import FormGroup from '@material-ui/core/FormGroup';
import IconButton from '@material-ui/core/IconButton';
import IconEvent from '@material-ui/icons/Event';
import IconRotate from '@material-ui/icons/RotateRight';
import IconClose from '@material-ui/icons/Close';
import { Tabs } from 'metadata-react/App/AntTabs';
import DataObj from 'metadata-react/FrmObj/DataObj';
import LoadingMessage from 'metadata-react/DumbLoader/LoadingMessage';
import DataObjToolbar from 'metadata-react/FrmObj/DataObjToolbar';
import DataField from 'metadata-react/DataField';
import TabularSection from 'metadata-react/TabularSection';
import withStyles from 'metadata-react/styles/paper600';
import SelectOrder from './SelectOrder';
import MenuFillCutting from './MenuFillCutting';
import MenuPrint from './MenuPrint';
import ProgressDialog from './ProgressDialog';
const htitle = 'Задание на производство';
const description = 'Раскрой, потребность в материалах, файлы для станков';
const schemas = {
  planning: 'c864d895-ac50-42be-8760-203cc46d208f',
  demand: 'dab2c503-a426-4bf5-f083-fe6f1c64fbe5',
  cuts_in: '187f9a40-94fc-4ad2-ee4c-26341b816ade',
  cutting: '4fe15a0f-a6c2-442e-d8bb-7204c3085c4e',
  cuts_out: '8fca797a-4e1c-4f8b-b0aa-1965b5e5e7db'
};
function Space({
  classes,
  children
}) {
  return [/*#__PURE__*/React.createElement("div", {
    key: "space",
    className: classes.fullFlex
  }), ...children];
}
class FrmObj extends DataObj {
  constructor(props, context) {
    super(props, context);
    this.handleOrder = row => {
      const {
        _obj
      } = this.state;
      _obj && _obj.fill_by_orders([row]).then(() => this.forceUpdate());
    };
    this.handlePlan = () => {
      this.props.handleIfaceState({
        component: '',
        name: 'alert',
        value: {
          open: true,
          title: 'Заполнить по плану',
          text: 'Сервис планирования не подключен'
        }
      });
    };
    this.handleFillCutting = opts => {
      const {
        _obj
      } = this.state;
      _obj && _obj.fill_cutting(opts).then(() => this.forceUpdate());
    };
    this.handleOptimize = (opts = {}) => {
      const {
        _obj
      } = this.state;
      opts.onStep = this.handleOnStep;
      this.setState({
        statuses: [],
        run: true
      });
      _obj && _obj.optimize(opts).then(() => this.setState({
        run: false
      }));
    };
    // вызывается из раскроя
    this.handleOnStep = status => {
      const {
        nom,
        characteristic
      } = status.cut_row;
      const statuses = $p.utils._clone(this.state.statuses);
      let row;
      if (!statuses.some(elm => {
        if (elm.nom === nom && elm.characteristic === characteristic) {
          row = elm;
          return true;
        }
      })) {
        row = {
          nom,
          characteristic
        };
        statuses.push(row);
      }
      Object.assign(row, status);
      this.setState({
        statuses
      });
    };
    Object.assign(this.state, {
      index: 0,
      schemas_ready: typeof schemas.planning === 'object',
      statuses: [],
      run: false
    });
  }
  componentDidMount() {
    const {
      _mgr,
      match
    } = this.props;
    _mgr.get(match.params.ref, 'promise').then(_obj => {
      this.setState({
        _obj
      }, () => this.shouldComponentUpdate(this.props));
      return _obj.load_linked_refs();
    }).then(({
      planning
    }) => planning.count() && this.forceUpdate());
    _mgr.on('update', this.onDataChange);
    if (!this.state.schemas_ready) {
      const {
        scheme_settings
      } = $p.cat;
      const {
        adapter
      } = scheme_settings;
      adapter.load_array(scheme_settings, Object.keys(schemas).map(ref => schemas[ref]), false, adapter.local.templates).then(() => {
        for (const ts in schemas) {
          schemas[ts] = scheme_settings.get(schemas[ts]);
        }
        this.setState({
          schemas_ready: true
        });
      });
    }
  }
  renderFields(_obj, classes) {
    return /*#__PURE__*/React.createElement(FormGroup, {
      key: "props",
      className: classes.spaceLeft
    }, /*#__PURE__*/React.createElement(FormGroup, {
      row: true
    }, /*#__PURE__*/React.createElement(DataField, {
      _obj: _obj,
      _fld: "number_doc"
    }), /*#__PURE__*/React.createElement(DataField, {
      _obj: _obj,
      _fld: "date"
    }), /*#__PURE__*/React.createElement(DataField, {
      _obj: _obj,
      _fld: "responsible"
    })), /*#__PURE__*/React.createElement(FormGroup, {
      row: true
    }, /*#__PURE__*/React.createElement(DataField, {
      _obj: _obj,
      _fld: "key"
    }), /*#__PURE__*/React.createElement(DataField, {
      _obj: _obj,
      _fld: "recipient"
    }), /*#__PURE__*/React.createElement(DataField, {
      _obj: _obj,
      _fld: "biz_cuts"
    })), /*#__PURE__*/React.createElement(DataField, {
      _obj: _obj,
      _fld: "note",
      fullWidth: true
    }));
  }
  render() {
    const {
      props: {
        _mgr,
        classes,
        height
      },
      state: {
        _obj,
        _meta,
        index,
        schemas_ready,
        run,
        statuses
      },
      _handlers
    } = this;
    const toolbar_props = Object.assign({
      posted: _obj && _obj.posted,
      deleted: _obj && _obj.deleted,
      postable: !!(_meta.posted || _mgr.metadata('posted')),
      deletable: false
    }, _handlers);
    const h = height - 48;
    return _obj ? [_Helmet || (_Helmet = /*#__PURE__*/React.createElement(Helmet, {
      key: "helmet",
      title: htitle
    }, /*#__PURE__*/React.createElement("meta", {
      name: "description",
      content: description
    }))), /*#__PURE__*/React.createElement(Tabs, {
      key: "tabs",
      value: index,
      onChange: (event, index) => this.setState({
        index
      })
    }, _Tab || (_Tab = /*#__PURE__*/React.createElement(Tab, {
      label: "Шапка"
    })), _Tab2 || (_Tab2 = /*#__PURE__*/React.createElement(Tab, {
      label: "План"
    })), _Tab3 || (_Tab3 = /*#__PURE__*/React.createElement(Tab, {
      label: "Материалы"
    })), _Tab4 || (_Tab4 = /*#__PURE__*/React.createElement(Tab, {
      label: "Обрезь вход"
    })), _Tab5 || (_Tab5 = /*#__PURE__*/React.createElement(Tab, {
      label: "Раскрой"
    })), _Tab6 || (_Tab6 = /*#__PURE__*/React.createElement(Tab, {
      label: "Обрезь выход"
    })), /*#__PURE__*/React.createElement(Space, {
      classes: classes
    }, /*#__PURE__*/React.createElement(MenuPrint, {
      key: "fprint",
      _obj: _obj
    }), /*#__PURE__*/React.createElement(IconButton, {
      key: "fclose",
      title: "Закрыть форму",
      onClick: _handlers.handleClose
    }, _IconClose || (_IconClose = /*#__PURE__*/React.createElement(IconClose, null))))), index === 0 && /*#__PURE__*/React.createElement(DataObjToolbar, _extends({
      key: "toolbar"
    }, toolbar_props)), index === 0 && this.renderFields(_obj, classes), index !== 0 && !schemas_ready && (_LoadingMessage || (_LoadingMessage = /*#__PURE__*/React.createElement(LoadingMessage, null))), index === 1 && schemas_ready && /*#__PURE__*/React.createElement(TabularSection, {
      key: "planning",
      _obj: _obj,
      _tabular: "planning",
      minHeight: h,
      scheme: schemas.planning,
      denyReorder: true,
      btns: [_IconButton || (_IconButton = /*#__PURE__*/React.createElement(IconButton, {
        key: "a_sep1",
        disabled: true
      }, "|")), /*#__PURE__*/React.createElement(SelectOrder, {
        key: "a_ord",
        handleSelect: this.handleOrder
      }), /*#__PURE__*/React.createElement(IconButton, {
        key: "a_plan",
        title: "Заполнить по плану",
        onClick: this.handlePlan
      }, _IconEvent || (_IconEvent = /*#__PURE__*/React.createElement(IconEvent, null)))]
    }), index === 2 && schemas_ready && /*#__PURE__*/React.createElement(TabularSection, {
      key: "demand",
      _obj: _obj,
      _tabular: "demand",
      minHeight: h,
      scheme: schemas.demand,
      denyReorder: true
    }), index === 3 && schemas_ready && /*#__PURE__*/React.createElement(TabularSection, {
      key: "cuts_in",
      _obj: _obj,
      _tabular: "cuts",
      minHeight: h,
      scheme: schemas.cuts_in,
      denyReorder: true
    }), index === 4 && schemas_ready && /*#__PURE__*/React.createElement(TabularSection, {
      key: "cutting",
      _obj: _obj,
      _tabular: "cutting",
      minHeight: h,
      scheme: schemas.cutting,
      denyReorder: true,
      btns: [_IconButton2 || (_IconButton2 = /*#__PURE__*/React.createElement(IconButton, {
        key: "a_sep1",
        disabled: true
      }, "|")), /*#__PURE__*/React.createElement(MenuFillCutting, {
        key: "a_fill_cut",
        handleFillCutting: this.handleFillCutting
      }), /*#__PURE__*/React.createElement(IconButton, {
        key: "a_run",
        title: "Оптимизировать раскрой",
        onClick: this.handleOptimize
      }, _IconRotate || (_IconRotate = /*#__PURE__*/React.createElement(IconRotate, null)))]
    }), index === 5 && schemas_ready && /*#__PURE__*/React.createElement(TabularSection, {
      key: "cuts_out",
      _obj: _obj,
      _tabular: "cuts",
      minHeight: h,
      scheme: schemas.cuts_out,
      denyReorder: true
    }), run && /*#__PURE__*/React.createElement(ProgressDialog, {
      key: "statuses",
      statuses: statuses
    })] : _LoadingMessage2 || (_LoadingMessage2 = /*#__PURE__*/React.createElement(LoadingMessage, null));
  }
}
FrmObj.propTypes = {
  _mgr: PropTypes.object,
  // DataManager, с которым будет связан компонент
  _acl: PropTypes.string,
  // Права на чтение-изменение
  _meta: PropTypes.object,
  // Здесь можно переопределить метаданные

  read_only: PropTypes.object,
  // Элемент только для чтения

  handlers: PropTypes.object.isRequired // обработчики редактирования объекта
};

FrmObj.rname = 'FrmObj';
export default withStyles(FrmObj);