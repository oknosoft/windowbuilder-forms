import React from 'react';
import PropTypes from 'prop-types';
import Tab from '@material-ui/core/Tab';
import DataObj from 'metadata-react/FrmObj/DataObj';
import withStyles600 from 'metadata-react/styles/paper600';
import { Tabs } from 'metadata-react/App/AntTabs';
import TabContent from './TabContent';

var _ref = /*#__PURE__*/React.createElement(Tab, {
  label: "Реквизиты"
});

var _ref2 = /*#__PURE__*/React.createElement(Tab, {
  label: "Параметры"
});

var _ref3 = /*#__PURE__*/React.createElement(Tab, {
  label: "Спецификация"
});

var _ref4 = /*#__PURE__*/React.createElement(Tab, {
  label: "Конструкции"
});

var _ref5 = /*#__PURE__*/React.createElement(Tab, {
  label: "Координаты"
});

var _ref6 = /*#__PURE__*/React.createElement(Tab, {
  label: "Соединения"
});

var _ref7 = /*#__PURE__*/React.createElement(Tab, {
  label: "Заполнения"
});

var _ref8 = /*#__PURE__*/React.createElement(Tab, {
  label: "Вставки"
});

class CatCharacteristicsObj extends DataObj {
  constructor(props, context) {
    super(props, context);

    this.handleChangeTab = (event, tab) => {
      this.setState({
        tab
      });
    };

    this.state.tab = 0; // схемы компоновки для табчастей

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
    }, _ref, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8), /*#__PURE__*/React.createElement(TabContent, {
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