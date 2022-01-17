import React from 'react';

import cop from '../../../../assets/images/1-cop.jpg';
import bau from '../../../../assets/images/2-bau.jpg';
import ga from '../../../../assets/images/3-ga.jpg';
import tom from '../../../../assets/images/4-tom.jpg';
import ca from '../../../../assets/images/5-ca.jpg';
import cua from '../../../../assets/images/6-cua.jpg';
import * as Styled from './index.style';

function Dice({ front = cop, back = bau, top = ga, left = tom, right = ca, bottom = cua }) {
    const color = ['#A1CAE2', '#A685E2', '#FFB677', '#FFC4D0', '#FFAAA5', '#CAF7E3'];
    return (
        <Styled.Container>
            <Styled.Cube id="cube">
                <Styled.Front bgrColor={color[Math.floor(Math.random() * 6)]}>
                    <div style={{ backgroundImage: `url(${front})` }}></div>
                </Styled.Front>
                <Styled.Back bgrColor={color[Math.floor(Math.random() * 6)]}>
                    <div style={{ backgroundImage: `url(${back})` }}></div>
                </Styled.Back>
                <Styled.Top bgrColor={color[Math.floor(Math.random() * 6)]}>
                    <div style={{ backgroundImage: `url(${top})` }}></div>
                </Styled.Top>
                <Styled.Left bgrColor={color[Math.floor(Math.random() * 6)]}>
                    <div style={{ backgroundImage: `url(${left})` }}></div>
                </Styled.Left>
                <Styled.Right bgrColor={color[Math.floor(Math.random() * 6)]}>
                    {' '}
                    <div style={{ backgroundImage: `url(${right})` }}></div>
                </Styled.Right>
                <Styled.Bottom bgrColor={color[Math.floor(Math.random() * 6)]}>
                    <div style={{ backgroundImage: `url(${bottom})` }}></div>
                </Styled.Bottom>
            </Styled.Cube>
        </Styled.Container>
    );
}

export default Dice;
