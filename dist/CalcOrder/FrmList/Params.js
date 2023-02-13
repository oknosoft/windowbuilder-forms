/**
 * ### Фильтр по статусам, подразделениям и ответственным
 * по сути - редактор табчасти selection текущей scheme_settings
 *
 * @module Params
 *
 * Created by Evgeniy Malyarov on 07.03.2019.
 */

import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from '@material-ui/core/FormGroup';
import DataField from 'metadata-react/DataField';
import ChipList from 'metadata-react/DataField/ChipList';
import { withStyles } from '@material-ui/styles';
import { apply_ref_filter } from './scheme_change';
const styles = theme => ({
  group: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(2)
  }
});
const sort = (a, b) => {
  if (a.name < b.name) {
    return -1;
  } else if (a.name > b.name) {
    return 1;
  }
  return 0;
};
class Params extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = area => ({
      target
    }) => {
      this.setState({
        [area]: target.value
      });
      apply_ref_filter.call(this, area, target.value);
    };
    const states = this.obj_delivery_state = [{
      ref: 'draft',
      name: 'Черновики'
    }, {
      ref: 'sent',
      name: 'Отправлено'
    }, {
      ref: 'confirmed',
      name: 'Согласовано'
    }, {
      ref: 'declined',
      name: 'Отклонено'
    }, {
      ref: 'service',
      name: 'Сервис'
    }, {
      ref: 'complaints',
      name: 'Рекламации'
    }, {
      ref: 'template',
      name: 'Шаблоны'
    }];
    states._mgr = {
      get(v) {
        for (const el of states) {
          if (el.ref === v) {
            return el;
          }
        }
      },
      class_name: 'enm.obj_delivery_states'
    };
    const {
      current_user,
      cat
    } = $p;
    const department = this.department = [];
    department._mgr = cat.divisions;
    const partner = this.partner = [];
    partner._mgr = cat.partners;
    const manager = this.manager = [];
    manager._mgr = cat.users;
    if (current_user && !current_user.branch.empty()) {
      current_user.branch.divisions.forEach(v => {
        department.push(v.acl_obj);
      });
      cat.users.find_rows({
        branch: current_user.branch
      }, manager.push.bind(manager));
    } else {
      cat.divisions.forEach(v => {
        v.name && department.push(v);
      });
      cat.users.forEach(v => {
        v.name && manager.push(v);
      });
    }
    cat.partners.forEach(v => {
      v.name && partner.push(v);
    });
    this.state = {
      obj_delivery_state: [],
      department: [],
      partner: [],
      manager: []
    };
    const {
      selection
    } = this.props.scheme;
    selection.find_rows({
      left_value: 'obj_delivery_state',
      use: true
    }, row => {
      if (row.right_value) {
        const {
          obj_delivery_state
        } = this.state;
        for (const ref of row.right_value.split(',')) {
          if (ref === 'Черновик' || ref === 'Отозван') {
            const item = states.find(({
              ref
            }) => ref === 'draft');
            !obj_delivery_state.includes(item) && obj_delivery_state.push(item);
          } else if (ref === 'Отправлен') {
            obj_delivery_state.push(states.find(({
              ref
            }) => ref === 'sent'));
          } else if (ref === 'Подтвержден') {
            obj_delivery_state.push(states.find(({
              ref
            }) => ref === 'confirmed'));
          } else if (ref === 'Отклонен') {
            obj_delivery_state.push(states.find(({
              ref
            }) => ref === 'declined'));
          } else if (ref === 'Шаблон') {
            obj_delivery_state.push(states.find(({
              ref
            }) => ref === 'template'));
          }
        }
      }
    });
    if (department.length) {
      department.sort(sort);
      selection.find_rows({
        left_value: 'department',
        use: true
      }, row => {
        row.right_value && this.state.department.push.apply(this.state.department, row.right_value.split(','));
      });
    }
    if (partner.length) {
      partner.sort(sort);
      selection.find_rows({
        left_value: 'partner',
        use: true
      }, row => {
        row.right_value && this.state.partner.push.apply(this.state.partner, row.right_value.split(','));
      });
    }
    if (manager.length) {
      manager.sort(sort);
      selection.find_rows({
        left_value: 'manager',
        use: true
      }, row => {
        row.right_value && this.state.manager.push.apply(this.state.manager, row.right_value.split(','));
      });
    }
  }
  render() {
    const {
      scheme,
      classes
    } = this.props;
    const {
      obj_delivery_state,
      department,
      partner,
      manager
    } = this.state;
    return /*#__PURE__*/React.createElement("div", {
      className: classes.group
    }, /*#__PURE__*/React.createElement(FormGroup, {
      key: "dates",
      row: true
    }, /*#__PURE__*/React.createElement(DataField, {
      _obj: scheme,
      _fld: "date_from"
    }), /*#__PURE__*/React.createElement(DataField, {
      _obj: scheme,
      _fld: "date_till"
    })), /*#__PURE__*/React.createElement(ChipList, {
      title: "Статусы",
      items: this.obj_delivery_state,
      selectedItems: obj_delivery_state,
      handleChange: this.handleChange('obj_delivery_state'),
      fullWidth: true
    }), /*#__PURE__*/React.createElement(ChipList, {
      title: "Подразделения",
      items: this.department,
      selectedItems: department,
      handleChange: this.handleChange('department'),
      fullWidth: true
    }), /*#__PURE__*/React.createElement(ChipList, {
      title: "Контрагенты",
      items: this.partner,
      selectedItems: partner,
      handleChange: this.handleChange('partner'),
      fullWidth: true
    }), /*#__PURE__*/React.createElement(ChipList, {
      title: "Менеджер",
      items: this.manager,
      selectedItems: manager,
      handleChange: this.handleChange('manager'),
      fullWidth: true
    }));
  }
}
export default withStyles(styles)(Params);