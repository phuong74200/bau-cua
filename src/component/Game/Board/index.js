import React, { useState, useEffect } from 'react';

import layer from '../../../assets/baucua.jpg';
import socket from '../socket';
import * as Styled from './index.style';

const Slot = ({ items, set, setGold, gold }) => {
    const betSlot = () => {
        if (gold >= 5) {
            const user = 'self';
            setGold(gold - 5);
            set((pre) => {
                return {
                    ...pre,
                    [user]: {
                        bet: (pre[user] ? pre[user].bet : 0) + 5,
                        self: true,
                        position: pre[user]
                            ? pre[user].position
                            : { x: getRnd(10, 90), y: getRnd(10, 90) },
                    },
                };
            });
        } else {
            console.log('out of money');
        }
    };

    return (
        <Styled.Slot onClick={betSlot}>
            {Object.entries(items).map(([key, value]) => {
                const bet = value.bet;
                const color = () => {
                    if (bet > 15) {
                        return '#dce775';
                    }
                    if (bet > 13) {
                        return '#e57373';
                    }
                    if (bet > 11) {
                        return '#ffb74d';
                    }
                    if (bet > 9) {
                        return '#ba68c8';
                    }
                    if (bet > 7) {
                        return '#64b5f6';
                    }
                    if (bet > 5) {
                        return '#81c784';
                    }
                    return 'white';
                };
                return (
                    <Styled.Tag key={key} position={value.position} bet={bet} color={color()}>
                        {value.bet}
                    </Styled.Tag>
                );
            })}
        </Styled.Slot>
    );
};

const getRnd = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const Board = ({ setGold, gold }) => {
    const tags = new Array(6);
    tags[0] = useState({});
    tags[1] = useState({});
    tags[2] = useState({});
    tags[3] = useState({});
    tags[4] = useState({});
    tags[5] = useState({});

    useEffect(() => {
        const listener = (message) => {
            if (message.type === 'bet') {
                const bets = message.data.bet;
                const user = message.data.user;
                bets.forEach((bet, index) => {
                    if (bet > 0) {
                        tags[index][1]((pre) => {
                            return {
                                ...pre,
                                [user]: {
                                    bet: (pre[user] ? pre[user].bet : 0) + bet,
                                    position: pre[user]
                                        ? pre[user].position
                                        : { x: getRnd(10, 90), y: getRnd(10, 90) },
                                },
                            };
                        });
                    }
                });
            }
        };

        socket.on('events', listener);

        return () => socket.off('events', listener);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Styled.Board layer={layer}>
            <img src={layer} alt="board" />
            <Styled.Grid>
                {tags.map((tag, index) => {
                    return (
                        <Slot
                            key={index}
                            items={tag[0]}
                            set={tag[1]}
                            setGold={setGold}
                            gold={gold}
                            index={index}
                        ></Slot>
                    );
                })}
            </Styled.Grid>
        </Styled.Board>
    );
};

export default Board;
