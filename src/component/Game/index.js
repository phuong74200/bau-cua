import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import Board from './Board';
import Dice from './Dice';
import Rule from './Rule';
import UserTool from './UserTool';
import * as Styled from './index.style';
import socket from './socket';

const Game = () => {
    const diceFaces = ['cop', 'bau', 'ga', 'tom', 'ca', 'cua'];

    const [dice1, setDice1] = useState({ x: 0, y: 0 });
    const [dice2, setDice2] = useState({ x: 0, y: 0 });
    const [dice3, setDice3] = useState({ x: 0, y: 0 });

    const [gold, setGold] = useState(20);

    const kick = (face, setDice) => {
        const direction = {
            cop: [0, 0],
            tom: [90, 0],
            cua: [180, 0],
            bau: [270, 0],
            ca: [0, 90],
            ga: [0, 270],
        };

        const x =
            direction[face][0] === 0 ? Math.floor(Math.random() * 20) * 360 : direction[face][0];
        const y =
            direction[face][1] === 0 ? Math.floor(Math.random() * 20) * 360 : direction[face][1];

        setDice({ x: x * 10, y: y * 10 });
    };

    useEffect(() => {
        const listener = (message) => {
            const room = message.room;
            if (message.type === 'roll') {
                if (room === 1) {
                    const roll = message.rollResult;
                    kick(diceFaces[roll[0]], setDice1);
                    kick(diceFaces[roll[1]], setDice2);
                    kick(diceFaces[roll[2]], setDice3);
                }
            }
        };

        socket.on('events', listener);

        return () => socket.off('events', listener);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Styled.Game>
            <Styled.Container>
                <Styled.Center>
                    <Styled.Side>
                        <Styled.ToolBar>
                            <Styled.DiceContainer>
                                <Dice size={70} roll={dice1} />
                                <Dice size={70} roll={dice2} />
                                <Dice size={70} roll={dice3} />
                            </Styled.DiceContainer>
                            <Styled.BtnContainer>
                                <UserTool money={gold} />
                            </Styled.BtnContainer>
                        </Styled.ToolBar>
                        <Styled.BoardContainer>
                            <Board setGold={setGold} gold={gold} />
                        </Styled.BoardContainer>
                    </Styled.Side>
                </Styled.Center>
                <Styled.CenterVertical>
                    <Rule />
                    <Styled.FakeRank>Ranking goes there</Styled.FakeRank>
                </Styled.CenterVertical>
            </Styled.Container>
        </Styled.Game>
    );
};

export default Game;
