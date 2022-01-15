import React, { useRef, useState } from 'react';

import { BsThreeDotsVertical } from 'react-icons/bs';

import ga from '../../../../assets/3-ga.jpg';
import cop from '../../../../assets/images/1-cop.jpg';
import bau from '../../../../assets/images/2-bau.jpg';
import tom from '../../../../assets/images/4-tom.jpg';
import ca from '../../../../assets/images/5-ca.jpg';
import cua from '../../../../assets/images/6-cua.jpg';
import { Success, Error } from '../../../../helpers/notify';
import useDetectClickOutside from '../../../../hooks/useDetectionClickOut';
import roomApi from '../../../../services/api/roomApi';
import ButtonBase from '../../../Login/components/Button/ButtonBase';
import ButtonIcon from '../../../Login/components/Button/ButtonIcon';
import CardOverlay from '../CardOverlay';
import * as Styled from './index.style';

function RoomCard({ bgrImage, roomInfo, index, fetchingAllRooms }) {
    const optionList = [
        { name: 'update', label: 'Chỉnh sửa' },
        { name: 'delete', label: 'Xóa phòng' },
    ];

    const wrapperCardRef = useRef(null);
    const wrapperCardOptionRef = useRef(null);
    const [isOpenOverlay, setIsOpenOverlay] = useState(false);
    const [isOpenCardOption, setIsOpenCardOption] = useState(false);
    const [option, setOption] = useState('');

    useDetectClickOutside(wrapperCardRef, () => setIsOpenOverlay(false));
    useDetectClickOutside(wrapperCardOptionRef, () => setIsOpenCardOption(false));

    const handleSelectOption = (option) => {
        setOption(option);
        setIsOpenOverlay(true);
    };

    const handleClickJoin = async () => {
        try {
            let result = await roomApi.joinRoom(roomInfo._id);
            Success('Vào phòng thành công.');
        } catch (error) {
            console.log(error);
            Error('Vào phòng thất bại.');
        }
    };

    return (
        <Styled.CardWrapper ref={wrapperCardRef}>
            <Styled.CardOption className="card__option">
                <ButtonIcon
                    color="#fff"
                    icon={<BsThreeDotsVertical />}
                    border="1px solid #000"
                    onClick={() => setIsOpenCardOption(true)}
                ></ButtonIcon>
                <Styled.ListAction ref={wrapperCardOptionRef} isOpenCardOption={isOpenCardOption}>
                    {optionList.map((option, index) => (
                        <li key={index} onClick={() => handleSelectOption(option.name)}>
                            {option.label}
                        </li>
                    ))}
                </Styled.ListAction>
            </Styled.CardOption>
            <CardOverlay
                isOpenOverlay={isOpenOverlay}
                setIsOpenOverlay={setIsOpenOverlay}
                option={option}
                fetchingAllRooms={fetchingAllRooms}
                roomId={roomInfo._id}
            />
            <Styled.CardImage style={{ backgroundImage: `url(${bgrImage})` }}></Styled.CardImage>
            <Styled.CardContent>
                <h3>{roomInfo.name}</h3>
                <span>Phòng số: {index}</span>
            </Styled.CardContent>
            <Styled.CardAction>
                <ButtonBase
                    width="16rem"
                    padding="0.8rem"
                    background_color="#e63a0a"
                    text_color="white"
                    animation={true}
                    onClick={handleClickJoin}
                >
                    Vào phòng
                </ButtonBase>
            </Styled.CardAction>
        </Styled.CardWrapper>
    );
}

export default RoomCard;
