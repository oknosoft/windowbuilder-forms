function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Форма списка документа Расчет
 *
 * @module CalcOrderList
 *
 * Created by Evgeniy Malyarov on 05.10.2018.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

//import IconButton from '@material-ui/core/IconButton';
import DataList from 'metadata-react/DynList/DynList';
import handleSchemeChange from './scheme_change';
import Svgs from '../Svgs';
import QuickFilter from './QuickFilter';
const heights = new Map([[true, 24], [false, 93]]);
class CalcOrderList extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleRowSelect = ({
      selectedRow
    }) => {
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        if (selectedRow && this.prev_ref !== selectedRow.ref) {
          if (this.state.hidden) {
            return this.prev_ref = selectedRow.ref;
          }

          // Получаем идентификаторы продукций с вложениями
          const keys = [];
          if (!$p.utils.is_data_obj(selectedRow)) {
            const {
              doc
            } = $p.adapters.pouch.local;
            doc.get(`doc.calc_order|${selectedRow.ref}`).then(({
              production
            }) => {
              production && production.forEach(({
                characteristic
              }) => {
                !$p.utils.is_empty_guid(characteristic) && keys.push(`cat.characteristics|${characteristic}`);
              });
              return keys.length ? doc.allDocs({
                keys,
                limit: keys.length,
                include_docs: true
              }) : {
                rows: keys
              };
            }).then(({
              rows
            }) => {
              rows.forEach(({
                id,
                doc
              }) => {
                if (doc && doc.svg) {
                  const ind = keys.indexOf(id);
                  keys[ind] = {
                    ref: id.substr(20),
                    svg: doc.svg
                  };
                }
              });
              return keys.filter(v => v.svg);
            }).then(keys => {
              this.prev_ref = selectedRow.ref;
              this.setState({
                imgs: keys
              });
            }).catch($p.record_log);
          } else {
            selectedRow.production.forEach(({
              characteristic: {
                ref,
                svg
              }
            }) => {
              svg && keys.push({
                ref,
                svg
              });
            });
            this.prev_ref = selectedRow.ref;
            this.setState({
              imgs: keys
            });
          }
        } else {
          this.prev_ref = '';
          this.setState({
            imgs: []
          });
        }
      }, 300);
    };
    this.reverseHide = () => {
      const hidden = !this.state.hidden;
      $p.wsql.set_user_param('svgs_area_hidden', hidden);
      this.setState({
        hidden
      }, () => {
        if (!hidden && this.prev_ref) {
          const {
            prev_ref
          } = this;
          this.prev_ref = '';
          this.handleRowSelect({
            selectedRow: {
              ref: prev_ref
            }
          });
        }
      });
    };
    this.registerFilterChange = (handleFilterChange, scheme) => {
      const {
        state
      } = this;
      if (state.handleFilterChange !== handleFilterChange || state.scheme !== scheme) {
        this.setState({
          handleFilterChange,
          scheme
        });
      }
    };
    this.handlers = Object.assign({}, this.props.handlers, {
      handleSchemeChange: handleSchemeChange.bind(this)
    });
    this.state = {
      hidden: $p.wsql.get_user_param('svgs_area_hidden', 'boolean'),
      imgs: [],
      handleFilterChange: null,
      scheme: null
    };
    this.timer = 0;
    this.prev_ref = '';
  }
  render() {
    const {
      props: {
        windowHeight,
        windowWidth,
        title
      },
      state: {
        hidden,
        imgs,
        handleFilterChange,
        scheme
      },
      handlers
    } = this;
    const _mgr = $p.doc.calc_order;
    const sizes = {
      windowHeight,
      windowWidth,
      height: (windowHeight > 480 ? windowHeight - 51 : 428) - heights.get(hidden),
      width: windowWidth > 800 ? windowWidth - (windowHeight < 480 ? 20 : 0) : 800
    };
    const prm = $p.utils.prm();
    return [/*#__PURE__*/React.createElement(DataList, _extends({
      key: "list",
      frm_key: "list",
      _mgr: _mgr,
      _acl: 'e',
      _ref: prm.ref,
      handlers: handlers,
      title: title,
      onRowSelect: this.handleRowSelect,
      find_rows: _mgr.find_rows_custom,
      setting_in_menu: true
      //selectionMode
      //denyAddDel
      //show_variants
      ,
      btns: /*#__PURE__*/React.createElement(QuickFilter, {
        scheme: scheme,
        _mgr: _mgr,
        handleFilterChange: handleFilterChange,
        frm_key: "list"
      }),
      registerFilterChange: this.registerFilterChange,
      show_search: true
    }, sizes)), /*#__PURE__*/React.createElement(Svgs, {
      key: "svgs",
      hidden: hidden,
      imgs: imgs,
      height: heights.get(hidden) - 2,
      reverseHide: this.reverseHide,
      handleNavigate: handlers.handleNavigate
    })];
  }
}
CalcOrderList.rname = 'CalcOrderList';
export default CalcOrderList;