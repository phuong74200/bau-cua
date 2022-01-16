import React from 'react';

import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

import * as Styled from './index.style';

const Roll = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const _axios = axios.create({
        baseURL: 'http://localhost:5000/',
        timeout: 1000,
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
    });

    const rollToServer = () => {
        _axios.post(`/room/${searchParams.get('roomID')}/roll`, {
            id: searchParams.get('roomID'),
        });
    };
    return <Styled.Button onClick={rollToServer}>Lắc bầu cua</Styled.Button>;
};

const EndGame = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const _axios = axios.create({
        baseURL: 'http://localhost:5000/',
        timeout: 1000,
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
    });

    const endGame = () => {
        _axios.post(`/room/${searchParams.get('roomID')}/reset-and-get-rank`, {
            id: searchParams.get('roomID'),
        });
    };
    return (
        <Styled.Button onClick={endGame} bgColor="#FF7878">
            Kết thúc
        </Styled.Button>
    );
};

export { Roll, EndGame };
