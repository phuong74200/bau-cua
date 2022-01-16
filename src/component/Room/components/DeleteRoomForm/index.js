import React from 'react';

import { Success, Error } from '../../../../helpers/notify';
import roomApi from '../../../../services/api/roomApi';
import ButtonBase from '../../../Login/components/Button/ButtonBase';
import * as Styled from './index.style';

function DeleteRoomForm({ fetchingAllRooms = () => {}, roomId, setIsOpenOverlay }) {
    const handleClickDelete = async () => {
        try {
            let result = await roomApi.deleteRoom(roomId);
            Success('Xóa phòng thành công.');
            fetchingAllRooms();
            setIsOpenOverlay(false);
        } catch (error) {
            console.log(error);
            Error('Xóa phòng thất bại.');
        }
    };
    return (
        <Styled.Wrapper>
            <span>Bạn có chắc chắn muốn xóa phòng này không? </span>
            <ButtonBase
                width="16rem"
                padding="0.8rem"
                background_color="#e63a0a"
                text_color="white"
                animation={true}
                onClick={handleClickDelete}
            >
                Xóa phòng
            </ButtonBase>
        </Styled.Wrapper>
    );
}

export default DeleteRoomForm;
