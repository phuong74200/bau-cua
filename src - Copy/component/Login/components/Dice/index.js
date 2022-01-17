import React from 'react';

import cop from '../../../../assets/images/1-cop.jpg';
import bau from '../../../../assets/images/2-bau.jpg';
import ga from '../../../../assets/images/3-ga.jpg';
import tom from '../../../../assets/images/4-tom.jpg';
import ca from '../../../../assets/images/5-ca.jpg';
import cua from '../../../../assets/images/6-cua.jpg';
import * as Styled from './index.style';

function Dice({ front = cop, back = bau, top = ga, left = tom, right = ca, bottom = cua }) {
    return (
        <Styled.Container>
            <Styled.Cube id="cube">
                <Styled.Front style={{ backgroundImage: `url(${front})` }}></Styled.Front>
                <Styled.Back style={{ backgroundImage: `url(${back})` }}></Styled.Back>
                <Styled.Top style={{ backgroundImage: `url(${top})` }}></Styled.Top>
                <Styled.Left style={{ backgroundImage: `url(${left})` }}></Styled.Left>
                <Styled.Right style={{ backgroundImage: `url(${right})` }}></Styled.Right>
                <Styled.Bottom style={{ backgroundImage: `url(${bottom})` }}></Styled.Bottom>
            </Styled.Cube>
        </Styled.Container>
    );
}

export default Dice;
