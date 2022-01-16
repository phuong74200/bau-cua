import React, { useRef, useState } from 'react';

import { BsThreeDotsVertical } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import config from '../../../../configurations';
import { Success, Error } from '../../../../helpers/notify';
import useDetectClickOutside from '../../../../hooks/useDetectionClickOut';
import roomApi from '../../../../services/api/roomApi';
import ButtonBase from '../../../Login/components/Button/ButtonBase';
import ButtonIcon from '../../../Login/components/Button/ButtonIcon';
import { userDataSelector } from '../../../Login/loginSlice';
import CardOverlay from '../CardOverlay';
import * as Styled from './index.style';

const { ADMIN_ROLE } = config;

function RoomCard({ bgrImage, roomInfo, index, fetchingAllRooms }) {
    const userData = useSelector(userDataSelector);
    const optionList = [
        { name: 'update', label: 'Chỉnh sửa' },
        { name: 'delete', label: 'Xóa phòng' },
    ];

    const navigate = useNavigate();
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
        if (userData.role === ADMIN_ROLE) {
            localStorage.setItem('roomID', roomInfo._id);
            navigate(`/game/${roomInfo._id}`);
            return;
        }

        handleSelectOption('join');
    };

    return (
        <Styled.CardWrapper ref={wrapperCardRef}>
            {userData.role === ADMIN_ROLE ? (
                <Styled.CardOption className="card__option">
                    <ButtonIcon
                        color="#fff"
                        icon={<BsThreeDotsVertical />}
                        border="1px solid #000"
                        onClick={() => setIsOpenCardOption(true)}
                    ></ButtonIcon>
                    <Styled.ListAction
                        ref={wrapperCardOptionRef}
                        isOpenCardOption={isOpenCardOption}
                    >
                        {optionList.map((option, index) => (
                            <li key={index} onClick={() => handleSelectOption(option.name)}>
                                {option.label}
                            </li>
                        ))}
                    </Styled.ListAction>
                </Styled.CardOption>
            ) : null}
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
