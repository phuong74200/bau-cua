import React from 'react';

import ButtonBase from '../../../Login/components/Button/ButtonBase';
import * as Styled from './index.style';

function DeleteRoomForm(props) {
    return (
        <Styled.Wrapper>
            <span>Bạn có chắc chắn muốn xóa phòng này không? </span>
            <ButtonBase
                width="16rem"
                padding="0.8rem"
                background_color="#e63a0a"
                text_color="white"
                animation={true}
            >
                Xóa phòng
            </ButtonBase>
        </Styled.Wrapper>
    );
}

export default DeleteRoomForm;
