import React from 'react';

import { BsXLg } from 'react-icons/bs';

import ButtonIcon from '../../../Login/components/Button/ButtonIcon';
import DeleteRoomForm from '../DeleteRoomForm';
import UpdateRoomForm from '../UpdateRoomForm';
import * as Styled from './index.style';

function CardOverlay({
    isOpenOverlay = false,
    setIsOpenOverlay = () => {},
    option = '',
    fetchingAllRooms = () => {},
    roomId,
}) {
    return (
        <Styled.CardOverlay isOpenOverlay={isOpenOverlay}>
            <Styled.OverlayBody>
                <Styled.BtnCloseDialog>
                    <ButtonIcon
                        color="#000"
                        icon={<BsXLg />}
                        border="1px solid #000"
                        bgrColor="#fff"
                        onClick={() => {
                            setIsOpenOverlay(false);
                        }}
                    ></ButtonIcon>
                </Styled.BtnCloseDialog>
                {option === 'update' ? (
                    <UpdateRoomForm
                        roomId={roomId}
                        fetchingAllRooms={fetchingAllRooms}
                        setIsOpenOverlay={setIsOpenOverlay}
                    />
                ) : (
                    <DeleteRoomForm
                        roomId={roomId}
                        fetchingAllRooms={fetchingAllRooms}
                        setIsOpenOverlay={setIsOpenOverlay}
                    />
                )}
            </Styled.OverlayBody>
        </Styled.CardOverlay>
    );
}

export default CardOverlay;
