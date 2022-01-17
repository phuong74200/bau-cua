import React from 'react';

import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

import * as CONFIG from '../config';
import * as Styled from './index.style';

const Roll = ({ setRank }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const _axios = axios.create({
        baseURL: CONFIG.BE_URL,
        timeout: 1000,
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
    });

    const rollToServer = () => {
        _axios
            .post(`/room/${searchParams.get('roomID')}/roll`, {
                id: searchParams.get('roomID'),
            })
            .then((res) => {
                _axios
                    .post(`/room/${searchParams.get('roomID')}/reset-and-get-rank`, {
                        id: searchParams.get('roomID'),
                    })
                    .then((ranking) => {
                        setRank(ranking.data.data);
                    });
            });
    };
    return <Styled.Button onClick={rollToServer}>Lắc bầu cua</Styled.Button>;
};

const EndGame = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const _axios = axios.create({
        baseURL: CONFIG.BE_URL,
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
