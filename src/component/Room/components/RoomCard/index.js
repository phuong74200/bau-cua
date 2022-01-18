import React, { useRef, useState } from 'react';

import { BsThreeDotsVertical } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

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

const Polygon = ({ fill }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="195" height="195">
            <path
                stroke="none"
                fill={fill}
                d="M82.5 4.1602540378444a30 30 0 0 1 30 0l58.334591186013 33.679491924311a30 30 0 0 1 15 25.980762113533l0 67.358983848622a30 30 0 0 1 -15 25.980762113533l-58.334591186013 33.679491924311a30 30 0 0 1 -30 0l-58.334591186013 -33.679491924311a30 30 0 0 1 -15 -25.980762113533l1.0727994705995e-13 -67.358983848622a30 30 0 0 1 15 -25.980762113533"
            ></path>
        </svg>
    );
};

function RoomCard({ bgrImage, roomInfo, index, fetchingAllRooms }) {
    const userData = useSelector(userDataSelector);
    const optionList = [
        { name: 'update', label: 'Chỉnh sửa' },
        { name: 'delete', label: 'Xóa phòng' },
    ];
    const color = [
        ['#A1CAE2', '#D7E9F7', '#D6E5FA'],
        ['#A685E2', '#C9CBFF', '#D9D7F1'],
        ['#FFB677', '#FFD98E', '#F6EABE'],
        ['#FFC4D0', '#FBE8E7', '#F7DAD9'],
        ['#FFAAA5', '#FFD3B6', '#F4C7AB'],
        ['#CAF7E3', '#EDFFEC', '#D5ECC2'],
    ];

    const [searchParams, setSearchParams] = useSearchParams({});
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
            localStorage.setItem('roomName', roomInfo.name);
            navigate(`/game?roomID=${roomInfo._id}`);
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
                roomName={roomInfo.name}
            />
            {/* <Styled.CardImage style={{ backgroundImage: `url(${bgrImage})` }}></Styled.CardImage> */}
            <Styled.Slot>
                <Styled.Plate hoverColor={color[index % 6][2]}>
                    <Styled.Layer duration={30 + (index % 6) * 10}>
                        <Polygon fill={color[index % 6][0]} />
                    </Styled.Layer>
                    <Styled.Layer duration={10 + (index % 6) * 5}>
                        <Polygon fill={color[index % 6][1]} />
                    </Styled.Layer>
                    <Styled.Icon>
                        <img src={bgrImage} alt={bgrImage} />
                    </Styled.Icon>
                </Styled.Plate>
            </Styled.Slot>
            <Styled.CardContent>
                <h3>{roomInfo.name}</h3>
                <span>Phòng số: {index + 1}</span>
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
