import React from 'react';

import { BsThreeDotsVertical } from 'react-icons/bs';
import styledComponents from 'styled-components';

import ga from '../../../assets/3-ga.jpg';
import ButtonBase from '../../Login/components/Button/ButtonBase';
import ButtonIcon from '../../Login/components/Button/ButtonIcon';
import * as Styled from './index.style';

function RoomCard(props) {
    return (
        <Styled.CardWrapper>
            <Styled.CardOption>
                <ButtonIcon
                    color="#fff"
                    icon={<BsThreeDotsVertical />}
                    border="1px solid #000"
                ></ButtonIcon>
            </Styled.CardOption>
            <Styled.CardOverlay>
                <Styled.OverlayBoby></Styled.OverlayBoby>
            </Styled.CardOverlay>
            <Styled.CardImage style={{ backgroundImage: `url(${ga})` }}></Styled.CardImage>
            <Styled.CardContent>
                <h3>Lính Thủy Đánh Bộ</h3>
                <span>Phòng số: 1</span>
            </Styled.CardContent>
            <Styled.CardAction>
                <ButtonBase
                    width="16rem"
                    padding="0.8rem"
                    background_color="#e63a0a"
                    text_color="white"
                    animation={true}
                >
                    Vào phòng
                </ButtonBase>
            </Styled.CardAction>
        </Styled.CardWrapper>
    );
}

export default RoomCard;
