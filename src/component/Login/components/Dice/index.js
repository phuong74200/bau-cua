import React from 'react';

import * as Styled from './index.style';

function Dice() {
    return (
        <Styled.Container>
            <Styled.Cube id="cube">
                <Styled.Front></Styled.Front>
                <Styled.Back></Styled.Back>
                <Styled.Top></Styled.Top>
                <Styled.Left></Styled.Left>
                <Styled.Right></Styled.Right>
                <Styled.Bottom></Styled.Bottom>
            </Styled.Cube>
        </Styled.Container>
    );
}

export default Dice;
