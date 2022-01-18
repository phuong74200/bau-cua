import React, { useEffect, useState } from 'react';

import axios from 'axios';

import * as CONFIG from '../config';
import * as Styled from './index.style';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Ranking = ({ isShow, roomID, setRank }) => {
    const [list, setList] = useState([]);

    useEffect(() => {
        axios
            .post(
                `${CONFIG.BE_URL}/room/${roomID}/get-rank`,
                {
                    id: roomID,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                }
            )
            .then((res) => {
                setList(res.data.data);
            })
            .catch((e) => {});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isShow]);

    return (
        <Styled.Container isShow={isShow}>
            <Styled.Close>
                <FontAwesomeIcon
                    icon={faTimes}
                    onClick={() => {
                        setRank(false);
                    }}
                />
            </Styled.Close>
            <Styled.LowTopContainer>
                {list.map((item, index) => {
                    return (
                        <Styled.LowTop key={item.email}>
                            <Styled.Text weight="bold">#{index + 1}</Styled.Text>
                            <Styled.Text>{item.email}</Styled.Text>
                            <Styled.Text justify="flex-end">{item.coin} coins</Styled.Text>
                        </Styled.LowTop>
                    );
                })}
            </Styled.LowTopContainer>
        </Styled.Container>
    );
};

export default Ranking;
