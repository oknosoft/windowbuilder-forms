var _UpIcon, _DownIcon;
/**
 * ### Галлерея эскизов изделий текущего заказа
 *
 * @module Svgs
 *
 * Created by Evgeniy Malyarov on 14.05.2019.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import DownIcon from '@material-ui/icons/KeyboardArrowDown';
import { withStyles } from '@material-ui/styles';
import cn from 'classnames';
const styles = theme => ({
  root: {
    width: '100%',
    position: 'relative',
    paddingTop: 2,
    maxHeight: 180,
    display: 'flex'
  },
  fab: {
    position: 'absolute',
    top: theme.spacing(),
    right: theme.spacing(2)
  }
});
class Svgs extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      selected: ''
    };
  }
  render() {
    const {
      classes,
      hidden,
      height,
      reverseHide,
      handleNavigate,
      imgs
    } = this.props;
    const {
      selected
    } = this.state;
    return /*#__PURE__*/React.createElement("div", {
      className: classes.root,
      style: {
        minHeight: height
      }
    }, /*#__PURE__*/React.createElement(Fab, {
      size: "small",
      className: classes.fab,
      onClick: reverseHide,
      style: {
        top: hidden ? -16 : 0
      },
      title: hidden ? 'Показать эскизы' : 'Скрыть эскизы'
    }, hidden ? _UpIcon || (_UpIcon = /*#__PURE__*/React.createElement(UpIcon, null)) : _DownIcon || (_DownIcon = /*#__PURE__*/React.createElement(DownIcon, null))), !hidden && imgs.map(({
      ref,
      svg
    }) => {
      const ondblclick = () => handleNavigate(`/builder/${ref}`);
      const __html = svg ? $p.utils.scale_svg(svg, 88, 22) : '';
      return /*#__PURE__*/React.createElement("div", {
        key: ref,
        className: cn({
          rsvg_elm: true,
          rsvg_selected: ref === selected
        }),
        dangerouslySetInnerHTML: {
          __html
        },
        onClick: () => this.setState({
          selected: ref
        }),
        onDoubleClick: ondblclick
      });
    }));
  }
}
export default withStyles(styles, {
  withTheme: true
})(Svgs);