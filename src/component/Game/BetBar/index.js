import React from 'react';

import calabash from '../../../assets/_pack/calabash.png';
import chicken from '../../../assets/_pack/chicken.png';
import crab from '../../../assets/_pack/crab.png';
import fish from '../../../assets/_pack/fish.png';
import shrimp from '../../../assets/_pack/shrimp.png';
import tiger from '../../../assets/_pack/tiger.png';
import * as Styled from './index.style';

const BetBar = ({ list }) => {
    const slots = [tiger, calabash, chicken, shrimp, fish, crab];

    return (
        <Styled.Container>
            {list.map((item, index) => {
                return (
                    <Styled.Side key={index}>
                        <img src={slots[index]} />
                        <Styled.Text>x{item}</Styled.Text>
                    </Styled.Side>
                );
            })}
        </Styled.Container>
    );
};

export default BetBar;
