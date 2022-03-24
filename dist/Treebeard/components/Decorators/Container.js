import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { VelocityComponent } from 'velocity-react';

class Container extends PureComponent {
  renderToggle() {
    const {
      animations
    } = this.props;

    if (!animations) {
      return this.renderToggleDecorator();
    }

    return /*#__PURE__*/React.createElement(VelocityComponent, {
      animation: animations.toggle.animation,
      duration: animations.toggle.duration
    }, this.renderToggleDecorator());
  }

  renderToggleDecorator() {
    const {
      style,
      decorators,
      node,
      onClickToggle
    } = this.props;
    return /*#__PURE__*/React.createElement(decorators.Toggle, {
      style: style.toggle,
      node: node,
      onClick: onClickToggle
    });
  }

  render() {
    const {
      style,
      decorators,
      terminal,
      onClick,
      onClickHeader,
      onClickCheck,
      onRightClickHeader,
      node
    } = this.props;
    return /*#__PURE__*/React.createElement("div", {
      onClick: onClick ? () => onClick() : null,
      style: node.active ? { ...style.container
      } : { ...style.link
      }
    }, !terminal ? this.renderToggle() : null, /*#__PURE__*/React.createElement(decorators.Header, {
      node: node,
      style: style.header,
      onClick: onClickHeader,
      onRightClick: onRightClickHeader,
      onClickCheck: onClickCheck
    }));
  }

}

export default Container;