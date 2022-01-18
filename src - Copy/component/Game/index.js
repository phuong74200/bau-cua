import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { getResultBet, labelList } from '../../helpers/getResultBet';
import { Success, Error } from '../../helpers/notify';
import useDialog from '../../hooks/useDialog';
import usePrevious from '../../hooks/usePrevious';
import Dialog from '../Login/components/Dialog';
import { signOut } from '../Login/loginSlice';
import * as Admin from './AdminBar';
import BetBar from './BetBar';
import Board from './Board';
import Ranking from './Ranking';
import ResultDialog from './ResultDialog';
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
    faCoins,
    faTrophy,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    const [fixItems, setFixItems] = useState({});
    const [isRank, setRank] = useState(false);

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
                setUserBet(new Array(6).fill(0));
            })
            .catch((e) => {
                toast.error('Không thể đặt cược');
                const sum = userBet.reduce((pre, cur) => pre + cur, 0);
                setUserBet(new Array(6).fill(0));
                setGold(() => gold + sum);
                const data = e.response.data;
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
                tagsData.forEach((state) => {
                    state[1]({});
                });
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
            const preCoin = gold;
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
                    tagsData.forEach((state) => {
                        state[1]({});
                    });
                    openDialog();
                })
                // eslint-disable-next-line prettier/prettier
                .catch((error) => { });
            setRoll(false);
        }, 10000);
        setTimeout(() => {
            setDiceFace([
                [0, 0],
                [0, 0],
                [0, 0],
            ]);
        }, 11000);
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
            <Ranking isShow={isRank} roomID={searchParams.get('roomID')} setRank={setRank} />
            <Dialog
                title={() => {
                    const result = JSON.parse(localStorage.getItem('rollResult'));
                    result ? `[Kết quả: ${result[0]}, ${result[1]}, ${result[2]}]` : '';
                }}
                isShowing={isShowing}
                hide={handleCloseResultDialog}
            >
                <ResultDialog resultData={resultData} />
            </Dialog>
            <Styled.FixLayer>
                {Object.entries(fixItems).map(([key, value]) => {
                    return value;
                })}
            </Styled.FixLayer>
            <Styled.Sides>
                <Styled.ToolBar>
                    <Styled.MiniBtn>
                        <span>{gold}</span>
                        <div>Số lượng Đồng hiện đang có</div>
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
                    {role === 'user' ? (
                        <Styled.MiniBtn
                            clickable
                            onClick={() => {
                                putBetWithServer(userBet);
                            }}
                        >
                            <FontAwesomeIcon icon={faCheckSquare} />
                            <div>Xác nhận đặt cược (không thể đặt lại)</div>
                        </Styled.MiniBtn>
                    ) : null}
                    {role === 'user' ? (
                        <Styled.MiniBtn
                            clickable
                            onClick={() => {
                                const sum = userBet.reduce((pre, cur) => pre + cur, 0);
                                setUserBet(new Array(6).fill(0));
                                setGold(() => gold + sum);
                            }}
                        >
                            <FontAwesomeIcon icon={faRedo} />
                            <div>Đặt lại</div>
                        </Styled.MiniBtn>
                    ) : null}
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
                            {role === 'user' ? (
                                <Styled.MiniBtn>
                                    <Styled.CenterIcon>
                                        <FontAwesomeIcon icon={faCoins} />
                                    </Styled.CenterIcon>
                                    <Styled.CenterIcon>{gold}</Styled.CenterIcon>
                                </Styled.MiniBtn>
                            ) : null}
                            <Styled.TextField
                                name="ROOM ID"
                                readonly
                                editable
                                onClick={() => {
                                    copyRoomID();
                                    Success('RoomID đã được sao chép!');
                                }}
                            >
                                {searchParams.get('roomID')}
                            </Styled.TextField>
                            <Styled.TextField name={role.toUpperCase()}>
                                {name || 'admin'}
                            </Styled.TextField>
                            {role === 'admin' ? (
                                <Styled.MiniBtn
                                    onClick={() => {
                                        Admin.rollGame(searchParams.get('roomID'));
                                    }}
                                    clickable
                                >
                                    <Styled.CenterIcon>
                                        <FontAwesomeIcon icon={faDice} />
                                    </Styled.CenterIcon>
                                    <Styled.CenterIcon>Lắc bầu cua</Styled.CenterIcon>
                                </Styled.MiniBtn>
                            ) : null}
                            {role === 'admin' ? (
                                <Styled.MiniBtn
                                    onClick={() => {
                                        Admin.resetGame(searchParams.get('roomID'));
                                    }}
                                    clickable
                                >
                                    <Styled.CenterIcon>
                                        <FontAwesomeIcon icon={faStopCircle} />
                                    </Styled.CenterIcon>
                                    <Styled.CenterIcon>Reset game</Styled.CenterIcon>
                                </Styled.MiniBtn>
                            ) : null}
                            {role === 'admin' ? (
                                <Styled.MiniBtn
                                    onClick={() => {
                                        setRank((pre) => !pre);
                                    }}
                                    clickable
                                >
                                    <Styled.CenterIcon>
                                        <FontAwesomeIcon icon={faTrophy} />
                                    </Styled.CenterIcon>
                                    <Styled.CenterIcon>Ranking</Styled.CenterIcon>
                                </Styled.MiniBtn>
                            ) : null}
                        </Styled.Box>
                        <Styled.Box>
                            <Styled.MiniBtn
                                clickable
                                onClick={() => dispatch(signOut())}
                                style={{
                                    marginTop: 'auto',
                                }}
                            >
                                <Styled.CenterIcon bgColor="#e74c3c">
                                    <FontAwesomeIcon icon={faSignOutAlt} />
                                </Styled.CenterIcon>
                                <Styled.CenterIcon bgColor="#e74c3c">Đăng xuất</Styled.CenterIcon>
                            </Styled.MiniBtn>
                        </Styled.Box>
                    </Styled.Footer>
                    <Styled.View>
                        <Board
                            setFixItems={setFixItems}
                            tagsData={tagsData}
                            putBetWithServer={putBetWithServer}
                            setUserBet={setUserBet}
                            setGold={setGold}
                            gold={gold}
                            userBet={userBet}
                            role={role}
                        />
                    </Styled.View>
                    <Styled.Footer justify="center">
                        {role === 'user' ? (
                            <Styled.MiniBtn
                                clickable
                                onClick={() => {
                                    putBetWithServer(userBet);
                                }}
                            >
                                <Styled.CenterIcon>
                                    <FontAwesomeIcon icon={faCheckSquare} />
                                </Styled.CenterIcon>
                                <Styled.CenterIcon>Xác nhận đặt cược</Styled.CenterIcon>
                            </Styled.MiniBtn>
                        ) : null}
                        {role === 'user' ? (
                            <Styled.MiniBtn
                                clickable
                                onClick={() => {
                                    const sum = userBet.reduce((pre, cur) => pre + cur, 0);
                                    setUserBet(new Array(6).fill(0));
                                    setGold(() => gold + sum);
                                }}
                            >
                                <Styled.CenterIcon>
                                    <FontAwesomeIcon icon={faRedo} />
                                </Styled.CenterIcon>
                                <Styled.CenterIcon>Đặt lại</Styled.CenterIcon>
                            </Styled.MiniBtn>
                        ) : null}
                    </Styled.Footer>
                </Styled.Container>
                <BetBar list={userBet} />
            </Styled.Sides>
        </Styled.Game>
    );
};

export default Game;