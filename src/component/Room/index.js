import React, { useState, useEffect, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import bau from '../../assets/_pack/calabash.png';
import ga from '../../assets/_pack/chicken.png';
import cua from '../../assets/_pack/crab.png';
import ca from '../../assets/_pack/fish.png';
import tom from '../../assets/_pack/shrimp.png';
import cop from '../../assets/_pack/tiger.png';
import ButtonBase from '../../component/Login/components/Button/ButtonBase';
import Dialog from '../../component/Login/components/Dialog';
import config from '../../configurations';
import { Error } from '../../helpers/notify';
import useDialog from '../../hooks/useDialog';
import roomApi from '../../services/api/roomApi';
import { userDataSelector, signOut } from '../Login/loginSlice';
import CreateRoomForm from './components/CreateRoomDialog';
import RoomCard from './components/RoomCard';
import * as Styled from './index.style';

const { ADMIN_ROLE } = config;

function Room() {
    const bgrImageList = [cop, bau, ga, tom, ca, cua];
    const userData = useSelector(userDataSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isShowing, toggle, openDialog, closeDialog] = useDialog(false);
    const [roomList, setRoomList] = useState([]);

    const fetchingAllRooms = useCallback(async () => {
        try {
            let result = await roomApi.getAllRooms();
            if (result) {
                setRoomList(result.data);
            }
        } catch (error) {
            console.log(error);
            Error('Lỗi server');
        }
    }, []);

    useEffect(() => {
        if (userData.role && userData.role !== ADMIN_ROLE && localStorage.getItem('roomID')) {
            navigate('/game');
            return;
        }
        fetchingAllRooms();
    }, [fetchingAllRooms, navigate, userData.role]);

    return (
        <Styled.Container>
            <Styled.StyledRoom>
                <Styled.Header>{`Xin chào ${userData.name}, bạn hãy chọn phòng để bắt đầu đặt cược nhé !!!`}</Styled.Header>

                <Styled.GroupAction>
                    {userData.role === ADMIN_ROLE ? (
                        <ButtonBase
                            width="16rem"
                            padding="0.8rem"
                            background_color="#e63a0a"
                            text_color="white"
                            animation={true}
                            onClick={() => openDialog()}
                        >
                            Tạo phòng
                        </ButtonBase>
                    ) : null}
                    <ButtonBase
                        width="16rem"
                        padding="0.8rem"
                        background_color="#e63a0a"
                        text_color="white"
                        animation={true}
                        onClick={() => dispatch(signOut())}
                    >
                        Đăng xuất
                    </ButtonBase>
                </Styled.GroupAction>
                <Dialog title="" isShowing={isShowing} hide={closeDialog}>
                    <CreateRoomForm fetchingAllRooms={fetchingAllRooms} closeDialog={closeDialog} />
                </Dialog>
                <Styled.RoomWrapper>
                    {roomList.map((room, index) => (
                        <Styled.RoomItem key={index}>
                            <RoomCard
                                roomInfo={room}
                                index={index + 1}
                                bgrImage={bgrImageList[index % 6]}
                                fetchingAllRooms={fetchingAllRooms}
                            />
                        </Styled.RoomItem>
                    ))}
                </Styled.RoomWrapper>
            </Styled.StyledRoom>
        </Styled.Container>
    );
}

export default Room;
