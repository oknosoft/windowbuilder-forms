function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * ### Поле ввода ссылочных данных на базе material-ui-select
 *
 * @module FieldSelect
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import AbstractField, { suggestionText } from 'metadata/react/DataField/AbstractField';
import InputEditable from 'metadata-react/DataField/FieldInfinit/InputEditable';
import withStyles from 'metadata-react/DataField/styles';
import cn from 'classnames';

class FieldSelect extends AbstractField {
  constructor(_props, context) {
    super(_props, context);

    this.filter = (event, value, reason) => {
      if (reason === 'input') {//this.loadMoreRows(value.trim().toLowerCase());
      }
    };

    this.onChange = (e, value) => {
      super.onChange({
        target: {
          value
        }
      });
    };

    this.renderInput = iprops => {
      const {
        props: {
          classes,
          extClasses,
          fullWidth,
          className,
          mandatory,
          error: perror,
          onClick
        },
        state: {
          error
        },
        _meta,
        isTabular,
        read_only
      } = this;
      const props = {
        _meta,
        isTabular,
        classes,
        extClasses,
        className,
        fullWidth,
        mandatory,
        onClick,
        error: error || perror,
        value: this.masked_value()
      };
      return /*#__PURE__*/React.createElement(InputEditable, _extends({}, props, {
        iprops: Object.assign({}, iprops, {
          fullWidth
        })
      }));
    };

    Object.assign(this.state, {
      open: false,
      dialogOpened: '',
      options: [this.masked_value(_props)],
      error: false
    });
    this.loadOptions(_props._obj);
  }

  shouldComponentUpdate({
    _obj,
    _meta
  }) {
    if (this.props._obj !== _obj) {
      this.loadOptions(_obj);
      return false;
    }

    if (_meta && this.props._meta !== _meta) {
      this._meta = _meta;
      this.loadOptions(_obj);
      return false;
    }

    return true;
  }

  masked_value(props) {
    const {
      empty_text,
      _obj,
      _fld
    } = props || this.props;
    let value = _obj[_fld];

    if (empty_text && value && value.empty && value.empty()) {
      value = {
        ref: value.ref,

        get presentation() {
          return empty_text;
        },

        valueOf() {
          return this.ref;
        },

        toString() {
          return this.presentation;
        }

      };
    }

    return value;
  }

  getOptionSelected(option, value) {
    const left = option ? option.valueOf() : option;
    const right = value ? value.valueOf() : value;
    return left == right;
  }

  setOptions(options, v) {
    if (v && !options.includes(v)) {
      options.unshift(v);
    }

    options = Array.from(new Set(options.filter(v => v)));

    if (this._mounted) {
      this.setState({
        options
      });
    } else {
      Object.assign(this.state, {
        options
      });
    }
  }

  loadOptions(_obj) {
    const {
      _meta,
      props: {
        _fld
      },
      state
    } = this;
    const {
      is_ref,
      types
    } = _meta.type;
    const v = this.masked_value({
      _obj,
      _fld
    });

    const _manager = v && v._manager || _meta.type._mgr;

    const select = _manager ? _manager.get_search_selector({
      _obj,
      _meta,
      top: 999,
      skip: 0
    }) : {};

    _manager.get_option_list(select).then(options => {
      const sortedByMachineTools = options.filter(el => el.machine_tools_clr).sort((a, b) => {
        const result = Number(b.machine_tools_clr) - Number(a.machine_tools_clr);
        return result ? result : a.name.localeCompare(b.name);
      });
      const sortedByName = options.filter(el => !el.machine_tools_clr).sort((a, b) => a.name.localeCompare(b.name));
      return sortedByMachineTools.concat(sortedByName);
    }).then(options => {
      this.setOptions(options, v);
    });
  }

  renderOption(option) {
    // получаем строку цвета
    const {
      clr_str
    } = option;
    let hex = '',
        style = null;

    if (clr_str.length === 3) {
      hex = '';

      for (let i = 0; i < 3; i++) {
        hex += clr_str[i];
        hex += clr_str[i];
      }

      hex = parseInt(hex, 16);
    } else if (clr_str.length === 6) {
      hex = parseInt(clr_str, 16);
    }

    if (hex) {
      let back = hex.toString(16);

      while (back.length < 6) {
        back = '0' + back;
      }

      back = '#' + back;
      let clr = (0xafafaf ^ hex).toString(16);

      while (clr.length < 6) {
        clr = '0' + clr;
      }

      clr = '#' + clr;
      style = {
        width: '100%',
        margin: -6,
        padding: 4,
        backgroundColor: back,
        color: clr
      };
    }

    return /*#__PURE__*/React.createElement(Typography, {
      noWrap: true,
      style: style
    }, suggestionText(option));
  }

  render() {
    const {
      props,
      state: {
        options
      },
      _meta,
      onChange,
      getOptionSelected,
      renderInput,
      renderOption
    } = this;
    const {
      classes,
      extClasses,
      fullWidth,
      read_only,
      disabled,
      isTabular,
      get_ref,
      empty_text,
      ...other
    } = props;
    const value = this.masked_value(props);
    const attr = {
      title: _meta.tooltip || _meta.synonym
    };

    if (_meta.mandatory && (!value || value.empty())) {
      attr.error = true;
    }

    if (read_only || disabled) {
      other.disabled = true;
    }

    return /*#__PURE__*/React.createElement(Autocomplete, {
      autoHighlight: true,
      disableClearable: true,
      value: this.masked_value(),
      options: options,
      getOptionLabel: suggestionText,
      getOptionSelected: getOptionSelected,
      onChange: onChange //onInputChange={this.filter}
      ,
      renderOption: renderOption,
      renderInput: renderInput
    });
  }

}

export default withStyles(FieldSelect);