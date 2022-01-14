import React, { useEffect, useRef, useState } from 'react';

import cop from '../../../assets/1-cop.jpg';
import bau from '../../../assets/2-bau.jpg';
import ga from '../../../assets/3-ga.jpg';
import tom from '../../../assets/4-tom.jpg';
import ca from '../../../assets/5-ca.jpg';
import cua from '../../../assets/6-cua.jpg';
import * as Styled from './index.style';

/*
    1: tiger
    2: gourd
    3: chicken
    4: shrimp
    5: fish
    6: crab
*/

const Dice = ({ size, roll }) => {
    const diceSize = size || 200;

    const ref = useRef();

    const faces = {
        front: cop,
        top: bau,
        right: ga,
        bottom: tom,
        left: ca,
        back: cua,
    };

    return (
        <Styled.Container size={diceSize}>
            <Styled.Cube size={diceSize} ref={ref} rotate={roll}>
                {Object.keys(faces).map((face) => {
                    return (
                        <div key={face} className={face}>
                            <img src={faces[face]} />
                        </div>
                    );
                })}
            </Styled.Cube>
        </Styled.Container>
    );
};

export default Dice;
