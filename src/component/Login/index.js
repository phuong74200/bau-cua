import React, { useEffect } from 'react';

import bannerBottom from '../../assets/images/banner_bottom.png';
import bannerLeft from '../../assets/images/banner_left.png';
import bannerRight from '../../assets/images/banner_right.png';
import happyNewYear from '../../assets/images/happynewyear.png';
import background_banner_bottom from '../../assets/images/nentet.png';
import ButtonLogin from './components/ButtonLogin';
import Dice from './components/Dice';
import * as Styled from './index.style.js';

const Login = () => {
    return (
        <Styled.Login>
            <Styled.BannerLeft>
                <img src={bannerLeft} alt="banner left"></img>
            </Styled.BannerLeft>
            <Styled.BannerRight>
                <img src={bannerRight} alt="banner right"></img>
            </Styled.BannerRight>
            <Styled.BannerBottom>
                <img src={background_banner_bottom} alt="banner bottom"></img>
                <div style={{ backgroundImage: `url(${bannerBottom})` }}></div>
            </Styled.BannerBottom>
            <Styled.LoginMain>
                <img src={happyNewYear} alt="happy new year"></img>
                <Styled.ButtonLoginWrapper>
                    <ButtonLogin />
                </Styled.ButtonLoginWrapper>
                <Styled.DiceWrapper>
                    <Dice />
                    <Dice />
                    <Dice />
                </Styled.DiceWrapper>
            </Styled.LoginMain>
        </Styled.Login>
    );
};

export default Login;
