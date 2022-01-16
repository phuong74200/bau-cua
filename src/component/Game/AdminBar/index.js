import React from 'react';

import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

import * as Styled from './index.style';

const Admin = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const _axios = axios.create({
        baseURL: 'http://localhost:5000/',
        timeout: 1000,
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
    });

    const rollToServer = () => {
        _axios.get(`/room/${searchParams.get('roomID')}/roll`);
    };

    const endGame = () => {
        _axios.get(`/room/${searchParams.get('roomID')}/reset-and-get-rank`);
    };

    return (
        <Styled.Container>
            <Styled.Button onClick={rollToServer}>Roll Dice</Styled.Button>
            <Styled.Button onClick={endGame}>End Game</Styled.Button>
        </Styled.Container>
    );
};

export default Admin;
