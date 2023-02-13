var _Tab, _Tab2, _Tab3, _Tab4, _Tab5, _Tab6, _Tab7, _Tab8;
import React from 'react';
import PropTypes from 'prop-types';
import Tab from '@material-ui/core/Tab';
import DataObj from 'metadata-react/FrmObj/DataObj';
import withStyles600 from 'metadata-react/styles/paper600';
import { Tabs } from 'metadata-react/App/AntTabs';
import TabContent from './TabContent';
class CatCharacteristicsObj extends DataObj {
  constructor(props, context) {
    super(props, context);
    this.handleChangeTab = (event, tab) => {
      this.setState({
        tab
      });
    };
    this.state.tab = 0;
    // схемы компоновки для табчастей
    this.schemas = {};
    const {
      class_name
    } = props._mgr;
    const names = Object.keys(this.state._meta.tabular_sections).map(name => `${class_name}.${name}`);
    $p.cat.scheme_settings.find_rows({
      obj: {
        in: names
      }
    }, scheme => {
      if (scheme.name.endsWith('.main')) {
        this.schemas[scheme.obj.split('.')[2]] = scheme;
      }
    });
  }
  renderTabularSections() {
    return null;
  }
  renderFields() {
    const {
      state: {
        _obj,
        tab
      },
      props: {
        classes,
        windowHeight
      }
    } = this;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Tabs, {
      value: tab,
      onChange: this.handleChangeTab,
      indicatorColor: "primary",
      textColor: "primary",
      variant: "scrollable"
    }, _Tab || (_Tab = /*#__PURE__*/React.createElement(Tab, {
      label: "Реквизиты"
    })), _Tab2 || (_Tab2 = /*#__PURE__*/React.createElement(Tab, {
      label: "Параметры"
    })), _Tab3 || (_Tab3 = /*#__PURE__*/React.createElement(Tab, {
      label: "Спецификация"
    })), _Tab4 || (_Tab4 = /*#__PURE__*/React.createElement(Tab, {
      label: "Конструкции"
    })), _Tab5 || (_Tab5 = /*#__PURE__*/React.createElement(Tab, {
      label: "Координаты"
    })), _Tab6 || (_Tab6 = /*#__PURE__*/React.createElement(Tab, {
      label: "Соединения"
    })), _Tab7 || (_Tab7 = /*#__PURE__*/React.createElement(Tab, {
      label: "Заполнения"
    })), _Tab8 || (_Tab8 = /*#__PURE__*/React.createElement(Tab, {
      label: "Вставки"
    }))), /*#__PURE__*/React.createElement(TabContent, {
      tab: tab,
      _obj: _obj,
      classes: classes,
      schemas: this.schemas,
      windowHeight: windowHeight
    }));
  }
}
CatCharacteristicsObj.propTypes = {
  windowHeight: PropTypes.number.isRequired
};
export default withStyles600(CatCharacteristicsObj);