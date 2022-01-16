import React, { useState, useEffect } from 'react';

import axios from 'axios';

import Board from './Board';
import Dice from './Dice';
import * as Styled from './index.style';
import socket from './socket';

const seedrandom = require('seedrandom');

const Game = () => {
    const dices = [useState(), useState(), useState()];
    const tagsData = [
        useState({}),
        useState({}),
        useState({}),
        useState({}),
        useState({}),
        useState({}),
    ];

    const [gold, setGold] = useState(0);
    const [name, setName] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:5000/user', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            })
            .then((res) => {
                setGold(res.data.data.coin);
            })
            .catch((error) => {});
    }, []);

    const playing = {};
    const [playerCount, setPlayerCount] = useState(0);

    const scale = (number, inMin, inMax, outMin, outMax) => {
        return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    };

    const putBet = (position, data) => {
        const matcher = ['tiger', 'calabash', 'chicken', 'shrimp', 'fish', 'crab'];
        const posIndex = typeof position === 'String' ? matcher[position] : position;
        const set = tagsData[posIndex][1];
        const user = data.user;
        const betValue = data.bet;

        playing[user] = null;
        setPlayerCount(Object.keys(playing).length);

        if (gold >= betValue) {
            setGold(gold - betValue);
            set((preState) => {
                const x = ~~scale(
                    seedrandom(user + 'x' + position.toString())() * 100,
                    0,
                    100,
                    10,
                    90
                );
                const y = ~~scale(
                    seedrandom(user + 'y' + position.toString())() * 100,
                    0,
                    100,
                    10,
                    90
                );
                return {
                    ...preState,
                    [user]: {
                        bet: (preState[user] ? preState[user].bet : 0) + betValue,
                        self: true,
                        x: preState[user] ? preState[user].x : x,
                        y: preState[user] ? preState[user].y : y,
                    },
                };
            });
        }
    };

    const putBetWithServer = (position, betValue = 5) => {
        const bet = new Array(6).fill(0);
        bet[position] = betValue;
        axios.post(
            'http://localhost:5000/room/1/bet',
            {
                bet: bet,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            }
        );
    };

    useEffect(() => {
        putBet(1, { user: 'fuong' });

        const listener = (message) => {
            const TYPE = message.type;
            if (TYPE === 'bet') {
                const slot = message.data.bet;
                slot.forEach((value, index) => {
                    if (value > 0) {
                        putBet(index, { user: message.data.user, bet: value });
                    }
                });
            }
        };
        socket.on('events', listener);
        return () => socket.off('events', listener);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Styled.Game>
            <Styled.Container>
                <Styled.Footer>
                    <div>
                        Gold: <span>{gold}</span>
                    </div>
                    <div>
                        <span>{name}</span>
                    </div>
                </Styled.Footer>
                <Styled.View>
                    <Board tagsData={tagsData} putBetWithServer={putBetWithServer} />
                </Styled.View>
                <Styled.Footer>
                    <div>
                        Player: <span>{playerCount}</span>
                    </div>
                    <div>
                        RoomID: <span>1</span>
                    </div>
                </Styled.Footer>
            </Styled.Container>
        </Styled.Game>
    );
};

export default Game;
