import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import * as Admin from './AdminBar';
import Board from './Board';
import RollStage from './RollStage';
import * as Styled from './index.style';
import socket from './socket';

import 'react-toastify/dist/ReactToastify.css';

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

    const _axios = axios.create({
        baseURL: 'http://localhost:5000/',
        timeout: 1000,
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
    });

    const [gold, setGold] = useState(0);
    const [name, setName] = useState('username');
    const [role, setRole] = useState('user');
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        _axios
            .get('/user')
            .then((res) => {
                const data = res.data.data;
                setGold(data.coin);
                setName(data.name);
                setRole(data.role);
            })
            .catch((error) => {
                console.log(error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

        setGold((pre) => {
            if (pre >= betValue) {
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
                return pre - betValue;
            } else {
                toast.error('Không đủ coin');
            }
            return pre;
        });
    };

    const putBetWithServer = (position, betValue = 5) => {
        const bet = new Array(6).fill(0);
        bet[position] = betValue;
        _axios
            .post(
                `/room/${searchParams.get('roomID')}/bet`,
                {
                    bet: bet,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                }
            )
            .then((res) => {
                toast.success('Đặt cược thành công!');
            })
            .catch((e) => {
                const data = e.response.data;
                toast.error(data.message);
            });
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
                const data = message.data;
                kick(data.rollResult);
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
            _axios
                .get('/user')
                .then((res) => {
                    const data = res.data.data;
                    setGold((pre) => {
                        if (data.coin > pre) {
                            toast.success(`You won ${data.coin - pre} coins`);
                        } else {
                            toast.error(`You lose 5 coins`);
                        }
                        return data.coin;
                    });
                    setName(data.name);
                    setRole(data.role);
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                });
            // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const copyRoomID = () => {
        navigator.clipboard.writeText(searchParams.get('roomID'));
    };

    const navigateTo = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        navigateTo('/login');
    };

    return (
        <Styled.Game>
            <RollStage isShow={isRoll} diceFace={diceFace} />
            <Styled.Sides>
                <Styled.Container>
                    <Styled.Footer justify="space-between" top={8}>
                        <Styled.Box>
                            <Styled.Button>
                                <span>coin: {gold}</span>
                            </Styled.Button>
                            {role === 'admin' ? (
                                <Styled.Box>
                                    <Admin.Roll />
                                    <Admin.EndGame />
                                </Styled.Box>
                            ) : (
                                <Styled.Button>{name}</Styled.Button>
                            )}
                        </Styled.Box>
                        <Styled.Box>
                            <Styled.Button bgColor="#FF7878" isClick onClick={logout}>
                                <span>Đăng xuất</span>
                            </Styled.Button>
                            <Styled.TextField
                                readonly
                                editable
                                onClick={() => {
                                    copyRoomID();
                                    toast.success('Room id copied to clipboard!');
                                }}
                            >
                                {searchParams.get('roomID')}
                            </Styled.TextField>
                        </Styled.Box>
                    </Styled.Footer>
                    <Styled.View>
                        <Board tagsData={tagsData} putBetWithServer={putBetWithServer} />
                    </Styled.View>
                    <Styled.Footer justify="flex-end" bottom={8}>
                        <Styled.Button status="close">
                            <span>Opening</span>
                        </Styled.Button>
                    </Styled.Footer>
                </Styled.Container>
                <div></div>
            </Styled.Sides>
        </Styled.Game>
    );
};

export default Game;
