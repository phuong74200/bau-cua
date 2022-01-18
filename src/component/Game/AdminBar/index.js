import React from 'react';

import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import * as CONFIG from '../config';

const _axios = axios.create({
    baseURL: CONFIG.BE_URL,
    timeout: 1000,
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
});

const rollGame = (roomID, cb = () => {}) => {
    _axios
        .post(`/room/${roomID}/roll`, {
            id: roomID,
        })
        .then((res) => {
            cb(res);
        });
};

const resetGame = (roomID, cb = () => {}) => {
    _axios
        .post(`/room/${roomID}/reset`, {
            id: roomID,
        })
        .then((res) => {
            cb(res);
            toast.success('Game đã được reset');
        })
        .catch((res) => {
            toast.error('Không thể reset game!');
        });
};

export { rollGame, resetGame };
