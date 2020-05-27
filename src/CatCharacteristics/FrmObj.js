
import React from 'react';
import PropTypes from 'prop-types';
import {withIface} from 'metadata-redux';
import DataObj from 'metadata-react/FrmObj/DataObj';
import withStyles600 from 'metadata-react/styles/paper600';
import Tab from '@material-ui/core/Tab';
import {Tabs} from '../Common/AntTabs';
import TabContent from './TabContent';


class CatCharacteristicsObj extends DataObj {

  constructor(props, context) {
    super(props, context);
    this.state.tab = 0;
    // схемы компоновки для табчастей
    this.schemas = {};
    const {class_name} = props._mgr;
    const names = Object.keys(this.state._meta.tabular_sections).map((name) => `${class_name}.${name}`);
    $p.cat.scheme_settings.find_rows({obj: {in: names}}, (scheme) => {
      if(scheme.name.endsWith('.main')) {
        this.schemas[scheme.obj.split('.')[2]] = scheme;
      }
    });
  }

  handleChangeTab = (event, tab) => {
    this.setState({tab});
  };

  renderTabularSections() {
    return null;
  }

  renderFields() {
    const {state: {_obj, tab}, props: {classes, windowHeight}}  = this;

    return <div>
      <Tabs
        value={tab}
        onChange={this.handleChangeTab}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
      >
        <Tab label="Реквизиты"/>
        <Tab label="Параметры"/>
        <Tab label="Спецификация"/>
        <Tab label="Конструкции"/>
        <Tab label="Координаты"/>
        <Tab label="Соединения"/>
        <Tab label="Заполнения"/>
        <Tab label="Вставки"/>
      </Tabs>
      <TabContent tab={tab} _obj={_obj} classes={classes} schemas={this.schemas} windowHeight={windowHeight} />
    </div>;
  }
}

CatCharacteristicsObj.propTypes = {
  windowHeight: PropTypes.number.isRequired,
};

export default withStyles600(withIface(CatCharacteristicsObj));
