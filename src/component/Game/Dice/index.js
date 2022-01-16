import React from 'react';

import calabash from '../../../assets/_pack/calabash.png';
import chicken from '../../../assets/_pack/chicken.png';
import crab from '../../../assets/_pack/crab.png';
import fish from '../../../assets/_pack/fish.png';
import shrimp from '../../../assets/_pack/shrimp.png';
import tiger from '../../../assets/_pack/tiger.png';
import * as Styled from './index.style';

const Dice = ({ size, rotate }) => {
    const faces = [calabash, chicken, fish, crab, shrimp, tiger];
    const position = ['front', 'back', 'left', 'right', 'top', 'bottom'];

    return (
        <Styled.Container size={size || 200}>
            <Styled.Cube size={size || 200} rotate={rotate}>
                {faces.map((face, index) => {
                    return (
                        <div key={index} className={position[index]}>
                            <img src={face} />
                        </div>
                    );
                })}
            </Styled.Cube>
        </Styled.Container>
    );
};

export default Dice;
