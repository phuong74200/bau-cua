import React from 'react';

import { BsXLg } from 'react-icons/bs';

import ButtonIcon from '../../../Login/components/Button/ButtonIcon';
import DeleteRoomForm from '../DeleteRoomForm';
import JoinRoomForm from '../JoinRoomForm';
import UpdateRoomForm from '../UpdateRoomForm';
import * as Styled from './index.style';

function CardOverlay({
    isOpenOverlay = false,
    setIsOpenOverlay = () => {},
    option = '',
    fetchingAllRooms = () => {},
    roomId,
}) {
    const renderForm = () => {
        switch (option) {
            case 'update':
                return (
                    <UpdateRoomForm
                        roomId={roomId}
                        fetchingAllRooms={fetchingAllRooms}
                        setIsOpenOverlay={setIsOpenOverlay}
                    />
                );
            case 'join':
                return (
                    <JoinRoomForm
                        roomId={roomId}
                        fetchingAllRooms={fetchingAllRooms}
                        setIsOpenOverlay={setIsOpenOverlay}
                    />
                );
            case 'delete':
                return (
                    <DeleteRoomForm
                        roomId={roomId}
                        fetchingAllRooms={fetchingAllRooms}
                        setIsOpenOverlay={setIsOpenOverlay}
                    />
                );
            default:
                return null;
        }
    };
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
                {renderForm()}
            </Styled.OverlayBody>
        </Styled.CardOverlay>
    );
}

export default CardOverlay;
