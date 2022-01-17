import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { getResultBet, labelList } from '../../helpers/getResultBet';
import { Success, Error } from '../../helpers/notify';
import useDialog from '../../hooks/useDialog';
import usePrevious from '../../hooks/usePrevious';
import Dialog from '../Login/components/Dialog';
import { signOut } from '../Login/loginSlice';
import * as Admin from './AdminBar';
import BetBar from './BetBar';
import Board from './Board';
import ResultDialog from './ResultDialog';
import RollStage from './RollStage';
import * as CONFIG from './config';
import * as Styled from './index.style';
import socket from './socket';

import 'react-toastify/dist/ReactToastify.css';

const seedrandom = require('seedrandom');

const Game = () => {
    const navigateTo = useNavigate();
    const dispatch = useDispatch();

    const [resultData, setResultData] = useState([]);
    const [userBet, setUserBet] = useState([0, 0, 0, 0, 0, 0]);

    const [isShowing, toggle, openDialog, closeDialog] = useDialog(false);
    const handleCloseResultDialog = () => {
        localStorage.removeItem('userBet');
        localStorage.removeItem('rollResult');
        closeDialog();
    };

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
                Success('Đặt cược thành công!');
                localStorage.setItem('userBet', JSON.stringify(userBet));
            })
            .catch((e) => {
                const data = e.response.data;
                Error(data.message);
                if (
                    e.response.status === 400 &&
                    e.response.data.message === 'User must join room before bet'
                ) {
                    localStorage.removeItem('roomID');
                    Error('Bạn hãy tham gia phòng để bắt đầu trò chơi.');
                    navigateTo('/room');
                }
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
                localStorage.setItem('rollResult', JSON.stringify(data.rollResult));
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
        // console.log('Result: ', face);
        // console.log('User Bet', JSON.parse(localStorage.getItem('userBet')));
        // console.log(
        //     'Result: ',
        //     getResultBet(
        //         JSON.parse(localStorage.getItem('rollResult')),
        //         JSON.parse(localStorage.getItem('userBet'))
        //     )
        // );
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
                    setGold(data.coin);
                    setName(data.name);
                    setRole(data.role);
                    setResultData(
                        getResultBet(
                            JSON.parse(localStorage.getItem('rollResult')),
                            JSON.parse(localStorage.getItem('userBet'))
                        )
                    );
                    setUserBet([0, 0, 0, 0, 0, 0]);
                    openDialog();
                })
                .catch((error) => {
                    Success(error.response.data.message);
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

    const logout = () => {
        localStorage.removeItem('token');
        navigateTo('/login');
    };

    return (
        <Styled.Game>
            <RollStage isShow={isRoll} diceFace={diceFace} />
            <Dialog
                title={
                    JSON.parse(localStorage.getItem('rollResult'))
                        ? `[Kết quả: ${
                              labelList[JSON.parse(localStorage.getItem('rollResult'))[0]]
                          }, ${labelList[JSON.parse(localStorage.getItem('rollResult'))[1]]}, ${
                              labelList[JSON.parse(localStorage.getItem('rollResult'))[2]]
                          }]`
                        : ''
                }
                isShowing={isShowing}
                hide={handleCloseResultDialog}
            >
                <ResultDialog resultData={resultData} />
            </Dialog>
            <Styled.Sides>
                <Styled.Container>
                    <Styled.Footer justify="space-between" top={8}>
                        <Styled.Box>
                            <Styled.Button>
                                <span>Tiền của bạn: {gold}</span>
                            </Styled.Button>
                            {role === 'admin' ? (
                                <Styled.Box>
                                    <Admin.Roll />
                                    <Admin.EndGame />
                                </Styled.Box>
                            ) : (
                                <Styled.Button>{name}</Styled.Button>
                            )}
                            {role === 'user' ? (
                                <Styled.Box>
                                    <Styled.Button
                                        bgColor="#07bc0c"
                                        isClick
                                        onClick={() => {
                                            putBetWithServer(userBet);
                                        }}
                                    >
                                        Xác nhận đặt cược
                                    </Styled.Button>
                                    <Styled.Button bgColor="#FF7878" isClick>
                                        Đặt lại
                                    </Styled.Button>
                                </Styled.Box>
                            ) : (
                                <div></div>
                            )}
                        </Styled.Box>
                        <Styled.Box>
                            <Styled.Button
                                bgColor="#FF7878"
                                isClick
                                onClick={() => dispatch(signOut())}
                            >
                                <span>Đăng xuất</span>
                            </Styled.Button>
                            <Styled.TextField
                                readonly
                                editable
                                onClick={() => {
                                    copyRoomID();
                                    Success('RoomID đã được sao chép!');
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
                    <Styled.Footer justify="center" bottom={8}>
                        <BetBar list={userBet} />
                    </Styled.Footer>
                </Styled.Container>
                <div></div>
            </Styled.Sides>
        </Styled.Game>
    );
};

export default Game;
