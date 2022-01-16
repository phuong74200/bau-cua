import React, { useState, useEffect } from 'react';

import axios from 'axios';

import Admin from './AdminBar';
import Board from './Board';
import RollStage from './RollStage';
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

    const [gold, setGold] = useState(1000);
    const [name, setName] = useState('username');
    const [role, setRole] = useState('user');

    // useEffect(() => {
    //     axios
    //         .get('http://localhost:5000/user', {
    //             headers: {
    //                 Authorization: 'Bearer ' + localStorage.getItem('token'),
    //             },
    //         })
    //         .then((res) => {
    //             const data = res.data.data;
    //             setGold(data.coin);
    //             setName(data.name);
    //             setRole(data.role);
    //         })
    //         .catch((error) => { });
    // }, []);

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
            setGold((pre) => pre - betValue);
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
        } else {
            console.log('not enough gold');
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

    const [isRoll, setRoll] = useState(false);

    useEffect(() => {
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
            if (TYPE === 'roll') {
                kick(message.rollResult);
            }
        };
        socket.on('events', listener);
        return () => socket.off('events', listener);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [diceFace, setDiceFace] = useState([
        [0, 0],
        [0, 0],
        [0, 0],
    ]);

    const kick = (face = []) => {
        const map = [
            [90, 0],
            [0, 0],
            [180, 0],
            [-90, 0],
            [0, 90],
            [0, -90],
        ];
        setRoll(true);
        face = face.map((x) => map[x]);
        for (let x of face) {
            x[0] === 0 ? Math.floor(Math.random() * 20) * 360 : x[0];
            x[1] === 0 ? Math.floor(Math.random() * 20) * 360 : x[1];
            x[0] += 36000;
            x[1] += 36000;
        }
        setDiceFace(face);

        setTimeout(() => {
            setRoll(false);
            setTimeout(() => {
                setDiceFace([
                    [0, 0],
                    [0, 0],
                    [0, 0],
                ]);
            }, 5000);
        }, 10000);
    };

    return (
        <Styled.Game>
            <RollStage isShow={isRoll} diceFace={diceFace} />
            <Styled.Container>
                <Styled.Footer justify="flex-start">
                    <Styled.Button>
                        <span>coin: {gold}</span>
                    </Styled.Button>
                    {role === 'admin' ? (
                        <Styled.Button>
                            <Admin />
                        </Styled.Button>
                    ) : (
                        <Styled.Button>{name}</Styled.Button>
                    )}
                </Styled.Footer>
                <Styled.View>
                    <Board tagsData={tagsData} putBetWithServer={putBetWithServer} />
                </Styled.View>
                <Styled.Footer justify="flex-end">
                    <Styled.Button>
                        <span>{playerCount} players</span>
                    </Styled.Button>
                    <Styled.Button>
                        <span>Room_SE</span>
                    </Styled.Button>
                    <Styled.Button status="close">
                        <span>Opening</span>
                    </Styled.Button>
                </Styled.Footer>
            </Styled.Container>
        </Styled.Game>
    );
};

export default Game;
