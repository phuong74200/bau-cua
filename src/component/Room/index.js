import React from 'react';

import baucua from '../../assets/images/baucua.jpg';
import RoomCard from './RoomCard';
import * as Styled from './index.style';

function Room(props) {
    return (
        <div>
            <Styled.StyledRoom>
                <Styled.RoomWrapper>
                    <RoomCard />
                    <RoomCard />
                    <RoomCard />
                </Styled.RoomWrapper>
            </Styled.StyledRoom>
        </div>
    );
}

export default Room;
