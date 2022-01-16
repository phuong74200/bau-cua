import React from 'react';

import Dice from '../Dice';
import * as Styled from './index.style';

const RollStage = ({ isShow, diceFace }) => {
    return (
        <Styled.Container isShow={isShow}>
            <Styled.DiceContainer>
                {diceFace.map((face, index) => {
                    return (
                        <Styled.Center key={index}>
                            <Dice rotate={{ x: face[0], y: face[1] }} />
                        </Styled.Center>
                    );
                })}
            </Styled.DiceContainer>
        </Styled.Container>
    );
};

export default RollStage;
