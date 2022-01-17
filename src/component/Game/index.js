import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import * as Admin from './AdminBar';
import BetBar from './BetBar';
import Board from './Board';
import RollStage from './RollStage';
import * as CONFIG from './config';
import * as Styled from './index.style';
import socket from './socket';

import {
    faDice,
    faSignOutAlt,
    faCheckSquare,
    faRedo,
    faStopCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
        baseURL: CONFIG.BE_URL,
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
    const [userBet, setUserBet] = useState([0, 0, 0, 0, 0, 0]);

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

        set((preState) => {
            const x = ~~scale(seedrandom(user + 'x' + position.toString())() * 100, 0, 100, 10, 90);
            const y = ~~scale(seedrandom(user + 'y' + position.toString())() * 100, 0, 100, 10, 90);
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
    };

    const putBetWithServer = (userBet) => {
        _axios
            .post(
                `/room/${searchParams.get('roomID')}/bet`,
                {
                    bet: userBet,
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
                toast.error('Không thể đặt cược');
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
                    setName(data.name);
                    setRole(data.role);
                    setGold(() => {
                        const sum = userBet.reduce((pre, cur) => pre + cur, 0);
                        if (data.coin > sum && sum > 0) {
                            toast.success(`You won ${data.coin - sum} coins`);
                        } else {
                            toast.error(`You lose ${sum - data.coin} coins`);
                        }
                        return data.coin;
                    });
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                });
            setRoll(false);
        }, 10000);
        setTimeout(() => {
            setDiceFace([
                [0, 0],
                [0, 0],
                [0, 0],
            ]);
        }, 14000);
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
                <Styled.ToolBar>
                    <Styled.MiniBtn>
                        <span>{gold}</span>
                        <div>Số lượng coin hiện đang có</div>
                    </Styled.MiniBtn>
                    {role === 'admin' ? (
                        <Styled.MiniBtn
                            onClick={() => {
                                Admin.rollGame(searchParams.get('roomID'));
                            }}
                            clickable
                        >
                            <FontAwesomeIcon icon={faDice} />
                            <div>Lắc bầu cua (admin only)</div>
                        </Styled.MiniBtn>
                    ) : null}
                    {role === 'admin' ? (
                        <Styled.MiniBtn
                            onClick={() => {
                                Admin.resetGame(searchParams.get('roomID'));
                            }}
                            clickable
                        >
                            <FontAwesomeIcon icon={faStopCircle} />
                            <div>Reset game (lấy rank và xóa room)</div>
                        </Styled.MiniBtn>
                    ) : null}
                    <Styled.MiniBtn
                        clickable
                        onClick={() => {
                            putBetWithServer(userBet);
                        }}
                    >
                        <FontAwesomeIcon icon={faCheckSquare} />
                        <div>Xác nhận đặt cược (không thể đặt lại)</div>
                    </Styled.MiniBtn>
                    <Styled.MiniBtn
                        clickable
                        onClick={() => {
                            const sum = userBet.reduce((pre, cur) => pre + cur, 0);
                            setUserBet(new Array(6).fill(0));
                            setGold(() => gold + sum);
                        }}
                    >
                        <FontAwesomeIcon icon={faRedo} />
                        <div>Xác nhận đặt cược (không thể đặt lại)</div>
                    </Styled.MiniBtn>
                    <Styled.MiniBtn
                        clickable
                        onClick={() => {
                            logout();
                        }}
                        style={{
                            marginTop: 'auto',
                        }}
                    >
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        <div>Đăng xuất</div>
                    </Styled.MiniBtn>
                </Styled.ToolBar>
                <Styled.Container>
                    <Styled.Footer justify="space-between" top={8}>
                        <Styled.Box>
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
                        <Board
                            tagsData={tagsData}
                            putBetWithServer={putBetWithServer}
                            setUserBet={setUserBet}
                            setGold={setGold}
                            gold={gold}
                            userBet={userBet}
                        />
                    </Styled.View>
                </Styled.Container>
                <BetBar list={userBet} />
            </Styled.Sides>
        </Styled.Game>
    );
};

export default Game;
