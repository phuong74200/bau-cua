import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { getResultBet, labelList } from '../../helpers/getResultBet';
import { Success, Error } from '../../helpers/notify';
import useDialog from '../../hooks/useDialog';
import usePrevious from '../../hooks/usePrevious';
import Dialog from '../Login/components/Dialog';
import { signOut, userDataSelector } from '../Login/loginSlice';
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
    const [roomData, setRoomData] = useState();

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

    const [gold, setGold] = useState(0);
    const [name, setName] = useState('username');
    const [role, setRole] = useState('user');
    const [searchParams, setSearchParams] = useSearchParams();
    const [fixItems, setFixItems] = useState({});
    const [isRank, setRank] = useState(false);
    const [isConfirm, setConfirm] = useState(false);
    const [rollDisable, setRollDisable] = useState(false);

    useEffect(() => {
        axios
            .get(`${CONFIG.BE_URL}/user`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            })
            .then((res) => {
                const data = res.data.data;
                setGold(data.coin);
                setName(data.name);
                setRole(data.role);
            })
            .catch((error) => {
                if (error.response && error.response.status == 401) {
                    navigateTo('/login');
                }
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
        axios
            .get(`${CONFIG.BE_URL}/room/${searchParams.get('roomID')}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            })
            .then((res) => {
                const data = res.data.data;
                setRoomData(data);
            })
            .catch((error) => {
                console.log(error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
        axios
            .get(`${CONFIG.BE_URL}/room/${searchParams.get('roomID')}/bet`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            })
            .then((res) => {
                const data = res.data.data;
                setConfirm(data.status);
            })
            .catch((error) => {
                if (error.response && error.response.status == 401) {
                    navigateTo('/login');
                }
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
        axios
            .post(
                `${CONFIG.BE_URL}/room/${searchParams.get('roomID')}/bet`,
                {
                    bet: userBet,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                }
            )
            .then(() => {
                Success('?????t c?????c th??nh c??ng!');
                setConfirm(true);
                localStorage.setItem('userBet', JSON.stringify(userBet));
                setUserBet(new Array(6).fill(0));
            })
            .catch((e) => {
                toast.error(
                    'Kh??ng th??? ?????t c?????c ho???c b???n ch??? c?? th??? ?????t c?????c 1 l???n trong 1 l?????t ch??i.'
                );
                // const sum = userBet.reduce((pre, cur) => pre + cur, 0);
                // setUserBet(new Array(6).fill(0));
                // setGold(() => gold + sum);
                const data = e.response.data;
                if (
                    e.response.status === 400 &&
                    e.response.data.message === 'User must join room before bet'
                ) {
                    localStorage.removeItem('roomID');
                    Error('B???n h??y tham gia ph??ng ????? b???t ?????u tr?? ch??i.');
                    navigateTo('/room');
                }
                if (e.response && e.response.status == 401) {
                    navigateTo('/login');
                }
            });
    };

    const [isRoll, setRoll] = useState(false);

    useEffect(() => {
        const listener = (message) => {
            const TYPE = message.type;
            if (TYPE === 'bet' && searchParams.get('roomID') === message.data.room) {
                const slot = message.data.bet;
                slot.forEach((value, index) => {
                    if (value > 0) {
                        putBet(index, { user: message.data.user, bet: value });
                    }
                });
            }
            if (TYPE === 'roll' && searchParams.get('roomID') === message.data.room) {
                const data = message.data;
                kick(data.rollResult);
                localStorage.setItem('rollResult', JSON.stringify(data.rollResult));
                tagsData.forEach((state) => {
                    state[1]({});
                });
                setUserBet([0, 0, 0, 0, 0, 0]);
                closeDialog();
                setResultData([]);
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
            axios
                .get(`${CONFIG.BE_URL}/user`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                })
                .then((res) => {
                    const data = res.data.data;
                    openDialog();
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
                    localStorage.removeItem('userBet');
                    localStorage.removeItem('rollResult');
                })
                // eslint-disable-next-line prettier/prettier
                .catch((error) => {
                    if (error.response && error.response.status == 401) {
                        navigateTo('/login');
                    }
                });
            setRoll(false);
            setConfirm(false);
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

    const moveToRoom = () => {
        localStorage.removeItem('roomID');
        localStorage.removeItem('roomName');
        setResultData([]);
        navigateTo('/room');
    };

    const getTitle = () => {
        const result = JSON.parse(localStorage.getItem('rollResult'));
        if (result)
            // eslint-disable-next-line prettier/prettier
            return `[K???t qu???: ${labelList[result[0]]}, ${labelList[result[1]]}, ${
                labelList[result[2]]
            }]`;
        else return '';
    };

    return (
        <Styled.Game>
            <RollStage isShow={isRoll} diceFace={diceFace} />
            {role === 'admin' ? (
                <Ranking isShow={isRank} roomID={searchParams.get('roomID')} setRank={setRank} />
            ) : null}
            <Dialog title={getTitle()} isShowing={isShowing} hide={handleCloseResultDialog}>
                <ResultDialog resultData={resultData} />
            </Dialog>
            <Styled.FixLayer>
                {Object.entries(fixItems).map(([key, value]) => {
                    return value;
                })}
            </Styled.FixLayer>
            <Styled.Sides>
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
                            {role === 'admin' ? (
                                <Styled.TextField
                                    name="ROOM ID"
                                    readonly
                                    editable
                                    onClick={() => {
                                        copyRoomID();
                                        Success('RoomID ???? ???????c sao ch??p!');
                                    }}
                                >
                                    {searchParams.get('roomID')}
                                </Styled.TextField>
                            ) : (
                                <Styled.TextField name="Ph??ng" readonly editable>
                                    {roomData ? roomData.name : ''}
                                </Styled.TextField>
                            )}
                            <Styled.TextField name={role.toUpperCase()}>
                                {name || 'admin'}
                            </Styled.TextField>
                            {role === 'admin' ? (
                                <Styled.MiniBtn
                                    onClick={() => {
                                        setRollDisable(true);
                                        Admin.rollGame(searchParams.get('roomID'));
                                        setTimeout(() => {
                                            setRollDisable(false);
                                        }, 1000);
                                    }}
                                    clickable
                                    isConfirm={rollDisable}
                                >
                                    <Styled.CenterIcon>
                                        <FontAwesomeIcon icon={faDice} />
                                    </Styled.CenterIcon>
                                    <Styled.CenterIcon>L???c b???u cua</Styled.CenterIcon>
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
                            {role === 'user' ? (
                                <Styled.MiniBtn
                                    clickable
                                    isConfirm={isConfirm}
                                    onClick={() => {
                                        putBetWithServer(userBet);
                                    }}
                                >
                                    <Styled.CenterIcon isConfirm={isConfirm}>
                                        <FontAwesomeIcon icon={faCheckSquare} />
                                    </Styled.CenterIcon>
                                    <Styled.CenterIcon isConfirm={isConfirm}>
                                        {isConfirm ? '???? ?????t c?????c' : 'X??c nh???n ?????t c?????c'}
                                    </Styled.CenterIcon>
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
                                    <Styled.CenterIcon>?????t l???i</Styled.CenterIcon>
                                </Styled.MiniBtn>
                            ) : null}
                            <Styled.MiniBtn
                                clickable
                                onClick={() => moveToRoom()}
                                style={{
                                    marginTop: 'auto',
                                }}
                            >
                                <Styled.CenterIcon bgColor="#e74c3c">
                                    <FontAwesomeIcon icon={faSignOutAlt} />
                                </Styled.CenterIcon>
                                <Styled.CenterIcon bgColor="#e74c3c">R???i ph??ng</Styled.CenterIcon>
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
                            isConfirm={isConfirm}
                        />
                    </Styled.View>
                </Styled.Container>
                <BetBar list={userBet} />
            </Styled.Sides>
        </Styled.Game>
    );
};

export default Game;
