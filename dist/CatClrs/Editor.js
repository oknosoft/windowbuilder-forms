var _ArrowDropDownIcon, _ArrowDropDownIcon2, _ArrowDropDownIcon3;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
import PropTypes from 'prop-types';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import useStyles from '../Common/stylesAccordion';
import FieldSelect from './FieldSelect';
function clr_proxy(_obj, _fld, handleValueChange) {
  if (_fld === 'clr' && 'clr_in' in _obj && 'clr_out' in _obj) {
    return _obj;
  }
  return {
    get clr() {
      return _obj[_fld];
    },
    set clr(v) {
      _obj[_fld] = v;
      handleValueChange && handleValueChange(_obj[_fld]);
    },
    get clr_in() {
      return this.clr.clr_in;
    },
    set clr_in(v) {
      const {
        clr
      } = this;
      this.clr = $p.cat.clrs.composite_ref('clr_in', clr.clr_out.empty() ? clr : clr.clr_out, v);
    },
    get clr_out() {
      return this.clr.clr_out;
    },
    set clr_out(v) {
      const {
        clr
      } = this;
      this.clr = $p.cat.clrs.composite_ref('clr_out', clr.clr_in.empty() ? clr : clr.clr_in, v);
    }
  };
}
export default function FieldClr({
  _meta,
  _obj,
  _fld,
  clr_group,
  handleValueChange,
  ...other
}) {
  const {
    cat: {
      clrs
    },
    utils,
    CatCharacteristicsInsertsRow
  } = $p;
  const classes = useStyles();

  // если не задан отбор и это строка вставок, формируем отбор по вставке
  if (_obj instanceof CatCharacteristicsInsertsRow && (!_meta.choice_params || !_meta.choice_params.length)) {
    _meta = utils._clone(_meta);
    clrs.selection_exclude_service(_meta, _obj.inset, {
      ox: _obj._owner._owner
    });
  }

  // для одиночного значения, редактор не показываем
  if (_meta.single_value || other.read_only) {
    const read_only = other.read_only || _meta.single_value === _obj[_fld];
    return /*#__PURE__*/React.createElement(FieldSelect, _extends({
      _meta: _meta,
      _obj: _obj,
      _fld: _fld,
      handleValueChange: handleValueChange
    }, other, {
      read_only: read_only
    }));
  }
  // если сказано скрыть составные - показываем редактор с единственным полем
  if (_meta.hide_composite || !_meta.type.str_len) {
    return /*#__PURE__*/React.createElement(FieldSelect, _extends({
      _meta: _meta,
      _obj: _obj,
      _fld: _fld,
      handleValueChange: handleValueChange
    }, other));
  }
  const proxy = clr_proxy(_obj, _fld, handleValueChange);
  const value = proxy.clr;
  const type = {
    is_ref: true,
    types: ['cat.clrs']
  };
  const meta_clr = Object.assign(utils._clone(_meta), {
    type,
    synonym: 'Общий'
  });
  const meta_in = Object.assign(utils._clone(_meta), {
    type,
    synonym: 'Изнутри'
  });
  const meta_out = Object.assign(utils._clone(_meta), {
    type,
    synonym: 'Снаружи'
  });
  other.isTabular = false;
  clrs.hide_composite(meta_in, clr_group, 'inner');
  clrs.hide_composite(meta_out, clr_group, 'outer');
  return /*#__PURE__*/React.createElement(Accordion, {
    square: true,
    elevation: 0,
    classes: {
      expanded: classes.rootExpanded
    }
  }, /*#__PURE__*/React.createElement(AccordionSummary, {
    classes: {
      root: classes.summary,
      content: classes.summaryContent,
      expanded: classes.summaryExpanded,
      expandIcon: classes.icon
    },
    expandIcon: _ArrowDropDownIcon || (_ArrowDropDownIcon = /*#__PURE__*/React.createElement(ArrowDropDownIcon, null))
  }, other.label_position == 'hide' ? /*#__PURE__*/React.createElement(Input, {
    readOnly: true,
    value: value && value.name,
    endAdornment: /*#__PURE__*/React.createElement(InputAdornment, {
      position: "end",
      classes: {
        root: classes.input
      }
    }, _ArrowDropDownIcon2 || (_ArrowDropDownIcon2 = /*#__PURE__*/React.createElement(ArrowDropDownIcon, null)))
  }) : /*#__PURE__*/React.createElement(FormControl, {
    classes: {
      root: classes.control
    }
  }, /*#__PURE__*/React.createElement(InputLabel, {
    classes: {
      shrink: classes.lshrink,
      formControl: classes.lformControl
    }
  }, "Цвет"), /*#__PURE__*/React.createElement(Input, {
    classes: {
      root: classes.iroot,
      input: classes.input
    },
    readOnly: true,
    value: value && value.name,
    endAdornment: /*#__PURE__*/React.createElement(InputAdornment, {
      position: "end",
      classes: {
        root: classes.input
      }
    }, _ArrowDropDownIcon3 || (_ArrowDropDownIcon3 = /*#__PURE__*/React.createElement(ArrowDropDownIcon, null)))
  }))), /*#__PURE__*/React.createElement(AccordionDetails, {
    classes: {
      root: classes.details
    }
  }, /*#__PURE__*/React.createElement(FieldSelect, _extends({
    _meta: meta_clr,
    _obj: proxy,
    _fld: "clr",
    handleValueChange: handleValueChange
  }, other)), /*#__PURE__*/React.createElement(FieldSelect, _extends({
    _meta: meta_in,
    _obj: proxy,
    _fld: "clr_in"
  }, other)), /*#__PURE__*/React.createElement(FieldSelect, _extends({
    _meta: meta_out,
    _obj: proxy,
    _fld: "clr_out"
  }, other))));
}