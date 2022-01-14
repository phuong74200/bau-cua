import React from 'react';

import ButtonBase from '../../../Login/components/Button/ButtonBase';
import * as Styled from './index.style';

function UpdateRoomForm(props) {
    return (
        <Styled.Wrapper>
            <div>
                <h4>Tên phòng:</h4>
                <input type="text" name="roomName" />
            </div>

            <ButtonBase
                width="16rem"
                padding="0.8rem"
                background_color="#e63a0a"
                text_color="white"
                animation={true}
            >
                Chỉnh sửa
            </ButtonBase>
        </Styled.Wrapper>
    );
}

export default UpdateRoomForm;
