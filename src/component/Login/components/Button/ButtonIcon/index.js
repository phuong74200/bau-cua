import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.button`
    width: ${(props) => props.width || '35px'};
    height: ${(props) => props.width || '35px'};
    border: ${(props) => props.border || 'none'};
    outline: none;
    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: ${(props) => props.fontSize || '16px'};
    background: transparent;

    &:hover,
    &:active {
        background: ${(props) => props.bgrColor || 'linear-gradient(45deg, #e63a0a, #ca0705)'};
        color: ${(props) => props.color || 'rgb(89, 171, 174)'};
        cursor: pointer;
    }
`;

export const ButtonIcon = (props) => {
    const { icon, ...rest } = props;
    return <Button {...rest}>{icon}</Button>;
};

export default ButtonIcon;
