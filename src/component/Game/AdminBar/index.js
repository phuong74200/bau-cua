import React from 'react';

import axios from 'axios';

import * as Styled from './index.style';

const Admin = () => {
    const rollToServer = () => {
        axios.get('localhost:5000/1/roll', {
            headers: {
                'Content-Type': '*',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
    };

    return (
        <Styled.Container>
            <Styled.Button onClick={rollToServer}>Roll Dice</Styled.Button>
            <Styled.Button>Open</Styled.Button>
            <Styled.Button>Close</Styled.Button>
        </Styled.Container>
    );
};

export default Admin;
