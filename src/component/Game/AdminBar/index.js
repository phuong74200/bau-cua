import React from 'react';

import axios from 'axios';

import { Success, Error } from '../../../helpers/notify';
import * as CONFIG from '../config';

const rollGame = (roomID, cb = () => {}) => {
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
        });
};

const resetGame = (roomID, cb = () => {}) => {
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
        .catch((e) => {
            Error('Không thể reset game!');
        });
};

export { rollGame, resetGame };
