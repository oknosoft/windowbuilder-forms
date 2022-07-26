import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {isArray} from 'lodash';

import defaultAnimations from '../../themes/animations';
import {Ul} from '../common';
import NodeHeader from '../NodeHeader';
import Drawer from './Drawer';
import Loading from './Loading';

const Li = styled('li', {
    shouldForwardProp: prop => ['className', 'children', 'ref'].indexOf(prop) !== -1,
})(({style}) => style);

class TreeNode extends PureComponent {

    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
        this.onClickToggle = this.onClickToggle.bind(this);
        this.onClickHeader = this.onClickHeader.bind(this);
    }

    onClick() {
        const {node, onToggle} = this.props;
        const {toggled} = node;
        if (onToggle) {
            onToggle(node, !toggled);
        }
    }

    onClickToggle() {
        const {node, onToggle} = this.props;
        if (onToggle) {
            const {toggled} = node;
            onToggle(node, !toggled);
        }
    }

    onClickHeader() {
        const {node, onClickHeader} = this.props;
        if (onClickHeader) {
            onClickHeader(node);
        }
    }

    animations() {
        const {animations, node} = this.props;
        if (!animations) {
            return {
                toggle: defaultAnimations.toggle(this.props, 0),
            };
        }
        const animation = Object.assign({}, animations, node.animations);
        return {
            toggle: animation.toggle(this.props),
            drawer: animation.drawer(this.props),
        };
    }

    decorators() {
        const {decorators, node} = this.props;
        let nodeDecorators = node.decorators || {};

        return Object.assign({}, decorators, nodeDecorators);
    }

    renderChildren(decorators) {
        const {
            animations, decorators: propDecorators,
            node,
            style,
            separateToggleEvent,
            onToggle,
            onClickHeader,
            onRightClickHeader,
        } = this.props;

        if (node.loading) {
            return (
                <Loading {...{decorators, style}}/>
            );
        }

        let children = node.children;
        if (!isArray(children)) {
            children = children ? [children] : [];
        }

        let {subtree} = style;
        if(node.style?.subtree) {
          subtree = Object.assign({}, subtree, node.style.subtree);
        }

        return (
            <Ul style={subtree}>
                {children.map((child, index) => (
                    <TreeNode
                        {...{separateToggleEvent, onToggle, onClickHeader, onRightClickHeader, animations, style}}
                        decorators={propDecorators}
                        key={child.id || index}
                        node={child}
                    />
                ))}
            </Ul>
        );
    }

    render() {
        const {node, style, separateToggleEvent, onRightClickHeader} = this.props;
        const decorators = this.decorators();
        const animations = this.animations();
        const {...restAnimationInfo} = animations.drawer;
        return (
            <Li style={style.base}>
                <NodeHeader
                    {...{decorators, animations, node, style}}
                    onClick={separateToggleEvent ? null : () => this.onClick()}
                    onClickHeader={separateToggleEvent ? () => this.onClickHeader() : null}
                    onRightClickHeader={separateToggleEvent ? onRightClickHeader : null}
                    onClickToggle={separateToggleEvent ? () => this.onClickToggle() : null}
                />
                <Drawer restAnimationInfo={{...restAnimationInfo}}>
                    {node.toggled ? this.renderChildren(decorators, animations) : null}
                </Drawer>
            </Li>
        );
    }
}

TreeNode.propTypes = {
    separateToggleEvent: PropTypes.bool,
    onToggle: PropTypes.func,
    onClickHeader: PropTypes.func,
    onRightClickHeader: PropTypes.func,
    style: PropTypes.object.isRequired,
    node: PropTypes.object.isRequired,
    decorators: PropTypes.object.isRequired,
    animations: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool,
    ]).isRequired,
};

export default TreeNode;
