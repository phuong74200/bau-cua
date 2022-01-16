/* eslint-disable react/prop-types */
import React from 'react';

import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const NotFound = ({ path }) => {
    return (
        <Container>
            <h2>404 - Page not found</h2>
            <p>The page you were looking for could not be found.</p>
            <p>You can try searching for something, or:</p>
        </Container>
    );
};

export default NotFound;
