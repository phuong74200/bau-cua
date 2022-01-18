import React from 'react';

import axios from 'axios';

import { Success, Error } from '../../../helpers/notify';
import * as CONFIG from '../config';

// eslint-disable-next-line prettier/prettier
const rollGame = (roomID, cb = () => { }) => {
    axios
        .post(
            `${CONFIG.BE_URL}/room/${roomID}/roll`,
            {
                id: roomID,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            }
        )
        .then((res) => {
            cb(res);
        })
        .catch((error) => {
            if (error.response && error.response.status == 401) {
                navigateTo('/login');
            }
        });
};

// eslint-disable-next-line prettier/prettier
const resetGame = (roomID, cb = () => { }) => {
    axios
        .post(
            `${CONFIG.BE_URL}/room/${roomID}/reset`,
            {
                id: roomID,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            }
        )
        .then((res) => {
            cb(res);
            Success('Reset game thành công.');
        })
        .catch((error) => {
            Error('Không thể reset game!');
            if (error.response && error.response.status == 401) {
                navigateTo('/login');
            }
        });
};

export { rollGame, resetGame };
