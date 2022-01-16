/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { down } from 'styled-breakpoints';
import { useBreakpoint } from 'styled-breakpoints/react-styled';

import cop from '../../assets/images/1-cop.jpg';
import bau from '../../assets/images/2-bau.jpg';
import ga from '../../assets/images/3-ga.jpg';
import tom from '../../assets/images/4-tom.jpg';
import ca from '../../assets/images/5-ca.jpg';
import cua from '../../assets/images/6-cua.jpg';
import bannerBottom from '../../assets/images/banner_bottom.png';
import bannerLeft from '../../assets/images/banner_left.png';
import bannerRight from '../../assets/images/banner_right.png';
import baucua from '../../assets/images/baucua.jpg';
import background_banner_bottom from '../../assets/images/nentet.png';
import { Error, Success } from '../../helpers/notify';
import authApi from '../../services/api/authApi';
import { PopupGoogleLogin } from '../../services/authentication/';
import { updateIns } from '../../utils/apiCaller';
import ButtonBase from './components/Button/ButtonBase';
import Dice from './components/Dice';
import * as Styled from './index.style.js';
import { login } from './loginSlice';

const Login = () => {
    const isMobile = useBreakpoint(down('sm'));
    let navigate = useNavigate();
    let dispatch = useDispatch();

    const onOAuthSuccess = async (OAuthToken, type = 'firebase') => {
        try {
            console.log(OAuthToken);
            localStorage.setItem('token', OAuthToken);
            updateIns();
            let result = await authApi.getUser(OAuthToken, type);
            dispatch(login(result.data));
            Success('Đăng nhập thành công.');
            navigate('/room');
        } catch (error) {
            console.log(error);
            Error('Đăng nhập thất bại.');
        } finally {
            //set Loading
        }
    };

    const onFirebaseLoginSuccess = async (result) => {
        onOAuthSuccess(await result.user.getIdToken(true));
        console.log('firebase: ', result.user);
    };

    const handleBtnLogin = () => {
        return (event) => {
            PopupGoogleLogin()
                .then(onFirebaseLoginSuccess)
                .catch((ex) => {
                    Error('Login failed, please try again!');
                });
        };
    };

    return (
        <Styled.Login style={{ backgroundImage: `url(${baucua})` }}>
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
                {/* <Styled.ButtonLoginWrapper>
                    <ButtonLogin handleClick={openDialog} />
                </Styled.ButtonLoginWrapper> */}

                <ButtonBase
                    width={isMobile ? '160px' : '300px'}
                    padding={isMobile ? '8px' : '16px'}
                    background_color="#e63a0a"
                    text_color="white"
                    border="1px solid #fff"
                    animation={true}
                    onClick={handleBtnLogin()}
                >
                    {isMobile ? 'Đăng nhập' : 'Đăng nhập với tài khoản Google'}
                </ButtonBase>
                <Styled.DiceWrapper>
                    <Dice front={ga} back={ca} top={tom} left={bau} right={cop} bottom={cua} />
                    <Dice front={ga} back={ca} top={tom} left={cua} right={cop} bottom={bau} />
                    <Dice front={cop} back={ca} top={tom} left={ga} right={cua} bottom={bau} />
                </Styled.DiceWrapper>
            </Styled.LoginMain>
        </Styled.Login>
    );
};

export default Login;
