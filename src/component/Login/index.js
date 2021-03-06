import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { down } from 'styled-breakpoints';
import { useBreakpoint } from 'styled-breakpoints/react-styled';

import bau from '../../assets/_pack/calabash.png';
import ga from '../../assets/_pack/chicken.png';
import cua from '../../assets/_pack/crab.png';
import ca from '../../assets/_pack/fish.png';
import tom from '../../assets/_pack/shrimp.png';
import cop from '../../assets/_pack/tiger.png';
import bannerBottom from '../../assets/images/banner_bottom.png';
import bannerLeft from '../../assets/images/banner_left.png';
import bannerRight from '../../assets/images/banner_right.png';
import background_banner_bottom from '../../assets/images/nentet.png';
import { Error, Success } from '../../helpers/notify';
import authApi from '../../services/api/authApi';
import { PopupGoogleLogin } from '../../services/authentication/';
import { updateIns } from '../../utils/apiCaller';
import Board from '../Game/Board';
import { Loading } from '../Loading';
import ButtonBase from './components/Button/ButtonBase';
import Dice from './components/Dice';
import * as Styled from './index.style.js';
import { login } from './loginSlice';

const Login = () => {
    const isMobile = useBreakpoint(down('sm'));
    let navigate = useNavigate();
    let dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('roomID');
    }, []);

    const onOAuthSuccess = async (OAuthToken, type = 'firebase') => {
        setIsLoading(true);
        try {
            localStorage.setItem('token', OAuthToken);
            updateIns();
            let result = await authApi.getUser(OAuthToken, type);
            dispatch(login(result.data));
            Success('Đăng nhập thành công.');
            setIsLoading(false);
            navigate('/room');
        } catch (error) {
            Error('Đăng nhập thất bại.');
            setIsLoading(false);
        } finally {
        }
    };

    const onFirebaseLoginSuccess = async (result) => {
        onOAuthSuccess(await result.user.getIdToken(true));
    };

    const handleBtnLogin = () => {
        return (event) => {
            PopupGoogleLogin()
                .then(onFirebaseLoginSuccess)
                .catch((ex) => {
                    Error('Đăng nhập lỗi, hãy thử lại!');
                });
        };
    };

    return (
        <div>
            <Loading isLoading={isLoading} />
            <Styled.Login>
                <Styled.BoardBackground>
                    <Board canBet={false} />
                </Styled.BoardBackground>

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
                    <ButtonBase
                        width={isMobile ? '160px' : '300px'}
                        padding={isMobile ? '8px' : '16px'}
                        background_color="#e63a0a"
                        text_color="white"
                        animation={true}
                        onClick={handleBtnLogin()}
                    >
                        {isMobile ? 'Đăng nhập' : 'Đăng nhập với mail @fpt.edu.vn'}
                    </ButtonBase>
                    <Styled.DiceWrapper>
                        <Dice front={ga} back={ca} top={tom} left={bau} right={cop} bottom={cua} />
                        <Dice front={ga} back={ca} top={tom} left={cua} right={cop} bottom={bau} />
                        <Dice front={cop} back={ca} top={tom} left={ga} right={cua} bottom={bau} />
                    </Styled.DiceWrapper>
                </Styled.LoginMain>
            </Styled.Login>
        </div>
    );
};

export default Login;
