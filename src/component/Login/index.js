/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

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
import useDialog from '../../hooks/useDialog';
import authApi from '../../services/api/authApi';
import firebase, { PopupGoogleLogin } from '../../services/authentication/';
import { updateIns } from '../../utils/apiCaller';
import ButtonBase from './components/Button/ButtonBase';
import ButtonLogin from './components/Button/ButtonLogin';
import Dialog from './components/Dialog';
import Dice from './components/Dice';
import * as Styled from './index.style.js';

const Login = () => {
    let navigate = useNavigate();
    const [isShowing, toggle, openDialog, closeDialog] = useDialog(false);

    const onOAuthSuccess = async (OAuthToken, type = 'firebase') => {
        try {
            let result = await authApi.getToken(OAuthToken, type);
            localStorage.setItem('token', result.data.token);
            updateIns();
            console.log(result.data.token);
            navigate('/room');
        } catch (error) {
            console.log(error);
            Error('Something wrongs');
        } finally {
            //set Loading
        }
    };

    const onFirebaseLoginSuccess = async (result) => {
        onOAuthSuccess(await result.user.getIdToken(true));
    };

    const handleBtnLogin = (type) => {
        return (event) => {
            PopupGoogleLogin()
                .then(onFirebaseLoginSuccess)
                .catch((ex) => {
                    Error('Login failed, please try again!');
                });
        };
    };

    const handleOpenDialog = () => {};

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
                    width="300px"
                    padding="20px"
                    background_color="#e63a0a"
                    text_color="white"
                    animation={true}
                >
                    Đăng nhập với tài khoản google
                </ButtonBase>

                <Dialog title="Post" isShowing={isShowing} hide={closeDialog}>
                    <div>
                        <h1>This is my dialog</h1>
                    </div>
                </Dialog>
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
