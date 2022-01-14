import React, { useRef, useState } from 'react';

import { BsThreeDotsVertical } from 'react-icons/bs';

import ga from '../../../../assets/3-ga.jpg';
import useDetectClickOutside from '../../../../hooks/useDetectionClickOut';
import ButtonBase from '../../../Login/components/Button/ButtonBase';
import ButtonIcon from '../../../Login/components/Button/ButtonIcon';
import CardOverlay from '../CardOverlay';
import DeleteRoomForm from '../DeleteRoomForm';
import UpdateRoomForm from '../UpdateRoomForm';
import * as Styled from './index.style';

function RoomCard() {
    const wrapperCardRef = useRef(null);
    const wrapperCardOptionRef = useRef(null);
    const [isOpenOverlay, setIsOpenOverlay] = useState(false);
    const [isOpenCardOption, setIsOpenCardOption] = useState(false);

    useDetectClickOutside(wrapperCardRef, () => setIsOpenOverlay(false));
    useDetectClickOutside(wrapperCardOptionRef, () => setIsOpenCardOption(false));
    return (
        <Styled.CardWrapper red={wrapperCardRef}>
            <Styled.CardOption className="card__option">
                <ButtonIcon
                    color="#fff"
                    icon={<BsThreeDotsVertical />}
                    border="1px solid #000"
                    onClick={() => setIsOpenCardOption(true)}
                ></ButtonIcon>
                <Styled.ListAction ref={wrapperCardOptionRef} isOpenCardOption={isOpenCardOption}>
                    <li>Chỉnh sửa</li>
                    <hr />
                    <li>Xóa phòng</li>
                </Styled.ListAction>
            </Styled.CardOption>
            <CardOverlay isOpenOverlay={isOpenOverlay} setIsOpenOverlay={setIsOpenOverlay} />
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
