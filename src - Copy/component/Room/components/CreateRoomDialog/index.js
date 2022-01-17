import React, { useState } from 'react';

import { Error, Success } from '../../../../helpers/notify';
import roomApi from '../../../../services/api/roomApi';
import ButtonBase from '../../../Login/components/Button/ButtonBase';
import * as Styled from './index.style';

function CreateRoomForm({ fetchingAllRooms = () => {}, closeDialog = () => {} }) {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleClickCreate = async () => {
        try {
            let result = await roomApi.createRoom({ name: value });
            Success('Tạo phòng thành công.');
            setValue('');
            fetchingAllRooms();
            closeDialog();
        } catch (error) {
            console.log(error);
            Error('Tạo phòng thất bại.');
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
                onClick={handleClickCreate}
            >
                Tạo phòng
            </ButtonBase>
        </Styled.Wrapper>
    );
}

export default CreateRoomForm;
