import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import ga from '../../assets/3-ga.jpg';
import cop from '../../assets/images/1-cop.jpg';
import bau from '../../assets/images/2-bau.jpg';
import tom from '../../assets/images/4-tom.jpg';
import ca from '../../assets/images/5-ca.jpg';
import cua from '../../assets/images/6-cua.jpg';
import baucua from '../../assets/images/baucua.jpg';
import ButtonBase from '../../component/Login/components/Button/ButtonBase';
import Dialog from '../../component/Login/components/Dialog';
import useDialog from '../../hooks/useDialog';
import { userDataSelector, signOut } from '../Login/loginSlice';
import CreateRoomForm from './components/CreateRoomDialog';
import RoomCard from './components/RoomCard';
import * as Styled from './index.style';

function Room() {
    const bgrImageList = [cop, bau, ga, tom, ca, cua];
    const userData = useSelector(userDataSelector);
    const dispatch = useDispatch();

    const [isShowing, toggle, openDialog, closeDialog] = useDialog(false);

    return (
        <Styled.StyledRoom>
            <Styled.Header>{`Xin chào ${userData.name}, bạn hãy chọn phòng để bắt đầu đặt cược nhé !!!`}</Styled.Header>
            <Styled.GroupAction>
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
                <CreateRoomForm />
            </Dialog>
            <Styled.RoomWrapper>
                {bgrImageList.map((room, index) => (
                    <Styled.RoomItem key={index}>
                        <RoomCard bgrImage={bgrImageList[index % 6]} />
                    </Styled.RoomItem>
                ))}
            </Styled.RoomWrapper>
        </Styled.StyledRoom>
    );
}

export default Room;
