import React from 'react';
import PropTypes from 'prop-types';
import {castArray} from 'lodash';

import defaultTheme from '../themes/default';
import defaultAnimations from '../themes/animations';
import {Ul} from './common';
import defaultDecorators from './Decorators';
import TreeNode from './TreeNode';

const TreeBeard = (props) => {
    const {
        animations,
        decorators,
        data,
        separateToggleEvent,
        onToggle,
        onClickHeader,
        onRightClickHeader,
        style,
    } = props;
    const nodeStyle = {...defaultTheme.tree.node, ...style.tree.node};
    return <Ul style={{...defaultTheme.tree.base, ...style.tree.base}}>
        {castArray(data).map((node, index) => (
            <TreeNode
                {...{decorators, node, separateToggleEvent, onToggle, onClickHeader, onRightClickHeader, animations}}
                key={node.id || index}
                style={nodeStyle}
            />
        ))}
    </Ul>;
};

TreeBeard.propTypes = {
    style: PropTypes.object,
    data: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
    ]).isRequired,
    animations: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool,
    ]),
    separateToggleEvent: PropTypes.bool,
    onToggle: PropTypes.func,
    onClickHeader: PropTypes.func,
    onRightClickHeader: PropTypes.func,
    decorators: PropTypes.object,
};

TreeBeard.defaultProps = {
    style: defaultTheme,
    animations: defaultAnimations,
    decorators: defaultDecorators,
};

export default TreeBeard;
