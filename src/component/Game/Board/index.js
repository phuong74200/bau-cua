import React from 'react';

import { useSearchParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import calabash from '../../../assets/_pack/calabash.png';
import chicken from '../../../assets/_pack/chicken.png';
import crab from '../../../assets/_pack/crab.png';
import fish from '../../../assets/_pack/fish.png';
import shrimp from '../../../assets/_pack/shrimp.png';
import tiger from '../../../assets/_pack/tiger.png';
import * as Styled from './index.style';

const Polygon = ({ fill }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="195" height="195">
            <path
                stroke="none"
                fill={fill}
                d="M82.5 4.1602540378444a30 30 0 0 1 30 0l58.334591186013 33.679491924311a30 30 0 0 1 15 25.980762113533l0 67.358983848622a30 30 0 0 1 -15 25.980762113533l-58.334591186013 33.679491924311a30 30 0 0 1 -30 0l-58.334591186013 -33.679491924311a30 30 0 0 1 -15 -25.980762113533l1.0727994705995e-13 -67.358983848622a30 30 0 0 1 15 -25.980762113533"
            ></path>
        </svg>
    );
};

const Board = ({
    tagsData = [],
    setUserBet,
    setGold,
    gold,
    userBet,
    canBet = true,
    setFixItems,
    role,
}) => {
    const slots = [tiger, calabash, chicken, shrimp, fish, crab];
    const color = [
        ['#A1CAE2', '#D7E9F7', '#D6E5FA'],
        ['#A685E2', '#C9CBFF', '#D9D7F1'],
        ['#FFB677', '#FFD98E', '#F6EABE'],
        ['#FFC4D0', '#FBE8E7', '#F7DAD9'],
        ['#FFAAA5', '#FFD3B6', '#F4C7AB'],
        ['#CAF7E3', '#EDFFEC', '#D5ECC2'],
    ];

    const addBet = (index, event) => {
        const k = Math.random();
        setGold((pre) => {
            if (pre >= 5 && role === 'user') {
                setUserBet(() => {
                    const clone = [...userBet];
                    clone[index] += 5;
                    return clone;
                });
                setFixItems((pre) => {
                    let c = {
                        ...pre,
                        [k]: (
                            <Styled.FlyUpAdd
                                key={k}
                                position={{ x: event.clientX, y: event.clientY }}
                            >
                                -5 Đồng
                            </Styled.FlyUpAdd>
                        ),
                    };
                    return c;
                });
                setTimeout(() => {
                    setFixItems((pre) => {
                        const c = { ...pre };
                        delete [k];
                        return c;
                    }, 1000);
                });
                return gold - 5;
            } else if (pre < 5) {
                toast.error('Không đủ Đồng.');
                return pre;
            } else if (role === 'admin') {
                toast.error('Admin không thể tham gia chơi!');
                return pre;
            }
        });
    };

    return (
        <Styled.Grid>
            {slots.map((slot, index) => {
                return (
                    <Styled.Slot
                        key={index}
                        onClick={(e) => {
                            addBet(index, e);
                        }}
                    >
                        <Styled.Plate hoverColor={color[index][2]}>
                            <Styled.Layer duration={30 + index * 10}>
                                <Polygon fill={color[index][0]} />
                            </Styled.Layer>
                            <Styled.Layer duration={10 + index * 5}>
                                <Polygon fill={color[index][1]} />
                            </Styled.Layer>
                            <Styled.Icon>
                                <img src={slot} alt={slot} />
                            </Styled.Icon>
                            {canBet ? (
                                <Styled.TagContainer>
                                    {Object.entries(tagsData[index][0]).map(([key, value]) => {
                                        const bet = value.bet;
                                        return (
                                            <Styled.TagShadow
                                                key={key}
                                                position={{ x: value.x || 0, y: value.y || 0 }}
                                                bet={bet}
                                            >
                                                <Styled.Tag bet={bet}>{bet}</Styled.Tag>
                                            </Styled.TagShadow>
                                        );
                                    })}
                                </Styled.TagContainer>
                            ) : null}
                        </Styled.Plate>
                    </Styled.Slot>
                );
            })}
        </Styled.Grid>
    );
};

export default Board;
