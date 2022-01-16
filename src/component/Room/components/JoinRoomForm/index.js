import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Success, Error } from '../../../../helpers/notify';
import roomApi from '../../../../services/api/roomApi';
import ButtonBase from '../../../Login/components/Button/ButtonBase';
import * as Styled from './index.style';

function JoinRoomForm({ fetchingAllRooms = () => {}, roomId, setIsOpenOverlay }) {
    const navigate = useNavigate();
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
    };
    const handleClickUpdate = async () => {
        try {
            let result = await roomApi.joinRoom(value);
            localStorage.setItem('roomID', value);
            Success('Vào phòng thành công.');
            navigate('/game');
        } catch (error) {
            console.log(error);
            if (error.code === 400) {
                Error('Bạn đã vào phòng trước đó.');
            } else {
                Error('Vào phòng thất bại.');
            }
        }
    };
    return (
        <Styled.Wrapper>
            <div>
                <h4>Nhập mã phòng:</h4>
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
                Vào phòng
            </ButtonBase>
        </Styled.Wrapper>
    );
}

export default JoinRoomForm;
