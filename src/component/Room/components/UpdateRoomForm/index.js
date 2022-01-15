import React, { useState } from 'react';

import { Success, Error } from '../../../../helpers/notify';
import roomApi from '../../../../services/api/roomApi';
import ButtonBase from '../../../Login/components/Button/ButtonBase';
import * as Styled from './index.style';

function UpdateRoomForm({ fetchingAllRooms = () => {}, roomId, setIsOpenOverlay }) {
    const [value, setValue] = useState('');
    const handleChange = (e) => {
        setValue(e.target.value);
    };
    const handleClickUpdate = async () => {
        try {
            let result = await roomApi.updateRoom(roomId, { name: value });
            Success('Chỉnh sửa phòng thành công.');
            setValue('');
            fetchingAllRooms();
            setIsOpenOverlay(false);
        } catch (error) {
            console.log(error);
            Error('Chỉnh sửa phòng thất bại.');
        }
    };
    return (
        <Styled.Wrapper>
            <div>
                <h4>Tên phòng:</h4>
                <input type="text" name="roomName" value={value} onChange={handleChange} />
            </div>

            <ButtonBase
                width="16rem"
                padding="0.8rem"
                background_color="#e63a0a"
                text_color="white"
                animation={true}
                onClick={handleClickUpdate}
            >
                Chỉnh sửa
            </ButtonBase>
        </Styled.Wrapper>
    );
}

export default UpdateRoomForm;
