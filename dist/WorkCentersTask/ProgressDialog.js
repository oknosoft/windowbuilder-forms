/**
 * ### Визуализация процесса раскроя
 *
 * @module ProgressDialog
 *
 * Created by Evgeniy Malyarov on 27.09.2018.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from 'metadata-react/App/Dialog';
import List from '@material-ui/core/List';
import Progress from './Progress';

class ProgressDialog extends Component {
  constructor(...args) {
    super(...args);

    this.handleCancel = () => {};
  }

  render() {
    const {
      props: {
        statuses
      },
      handleCancel
    } = this;
    return /*#__PURE__*/React.createElement(Dialog, {
      open: true,
      large: true,
      minheight: true,
      title: "Оптимизация раскроя",
      onClose: handleCancel,
      actions: [/*#__PURE__*/React.createElement(Button, {
        key: "cancel",
        onClick: handleCancel,
        color: "primary"
      }, "Закрыть")]
    }, /*#__PURE__*/React.createElement(List, null, statuses.map((status, index) => /*#__PURE__*/React.createElement(Progress, {
      key: `p-${index}`,
      status: status
    }))));
  }

}

export default ProgressDialog;