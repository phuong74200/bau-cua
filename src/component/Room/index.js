import React from 'react';

import baucua from '../../assets/images/baucua.jpg';
import RoomCard from './components/RoomCard';
import * as Styled from './index.style';

function Room(props) {
    return (
        <div>
            <Styled.StyledRoom>
                <Styled.RoomWrapper>
                    <Styled.RoomItem>
                        <RoomCard />
                    </Styled.RoomItem>
                    <Styled.RoomItem>
                        <RoomCard />
                    </Styled.RoomItem>
                    <Styled.RoomItem>
                        <RoomCard />
                    </Styled.RoomItem>
                    <Styled.RoomItem>
                        <RoomCard />
                    </Styled.RoomItem>
                    <Styled.RoomItem>
                        <RoomCard />
                    </Styled.RoomItem>
                    <Styled.RoomItem>
                        <RoomCard />
                    </Styled.RoomItem>
                </Styled.RoomWrapper>
            </Styled.StyledRoom>
        </div>
    );
}

export default Room;
