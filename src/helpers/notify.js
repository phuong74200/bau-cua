import React from 'react';

import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    align-items: center;

    & span {
        margin: 0 8px;
    }
`;

export const Success = (message) => {
    toast.success(
        <Wrapper>
            <span>{message}</span>
        </Wrapper>,
        {
            position: toast.POSITION.BOTTOM_RIGHT,
        }
    );
};
export const Error = (message) => {
    toast.error(
        <Wrapper>
            <span>{message}</span>
        </Wrapper>,
        {
            position: toast.POSITION.BOTTOM_RIGHT,
        }
    );
};
export const Info = (message) => {
    toast.info(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
    });
};
