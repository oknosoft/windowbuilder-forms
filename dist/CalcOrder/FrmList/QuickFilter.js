import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import { makeStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import Tip from '../../Common/Tip';
import Params from './Params';
import LoadingModal from 'metadata-react/DumbLoader/LoadingModal';
const useStyles = makeStyles(theme => ({
  paper: {
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper
  }
}));

var _ref = /*#__PURE__*/React.createElement("i", {
  className: "fa fa-filter fa-fw"
});

var _ref2 = /*#__PURE__*/React.createElement(AutorenewIcon, null);

export default function QuickFilter({
  scheme,
  _mgr,
  handleFilterChange
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const open = Boolean(anchorEl);
  const id = open ? 'popper-filter' : undefined;

  const handleClick = event => {
    if (anchorEl) {
      setAnchorEl(null);
      handleFilterChange();
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleDirectLoad = () => {
    const selector = {
      startkey: [_mgr.class_name, ...moment(scheme.date_till).format('YYYY-MM-DD').split('-').map(Number)],
      endkey: [_mgr.class_name, ...moment(scheme.date_from).format('YYYY-MM-DD').split('-').map(Number)],
      descending: true,
      include_docs: true,
      limit: 100000
    };
    setLoading(true);

    _mgr.direct_load({
      selector
    }).then(() => setLoading(false)).catch(() => setLoading(false));
  };

  const classes = useStyles();
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(LoadingModal, {
    open: loading,
    text: "Обмен данными с сервером"
  }), /*#__PURE__*/React.createElement(Tip, {
    title: "Быстрый фильтр>"
  }, /*#__PURE__*/React.createElement(IconButton, {
    "aria-describedby": id,
    onClick: handleClick
  }, _ref)), /*#__PURE__*/React.createElement(Popper, {
    id: id,
    open: open,
    anchorEl: anchorEl,
    placement: "bottom-start",
    onClose: handleClick,
    style: {
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: classes.paper
  }, /*#__PURE__*/React.createElement(Params, {
    scheme: scheme,
    handleFilterChange: handleFilterChange
  }), /*#__PURE__*/React.createElement(DialogActions, null, _mgr.direct_load ? /*#__PURE__*/React.createElement(Button, {
    variant: "contained",
    onClick: handleDirectLoad,
    startIcon: _ref2
  }, "Прочитать с сервера") : null, /*#__PURE__*/React.createElement(Button, {
    variant: "contained",
    onClick: handleClick,
    color: "primary"
  }, "Применить")))));
}