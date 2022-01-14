import styled from 'styled-components';

export const StyledRoom = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100vh;
    background-repeat: no-repeat;
    background-size: cover;
    aspect-ratio: 3/2;

    position: relative;
`;
export const RoomWrapper = styled.div`
    position: absolute;

    width: 1200px;
    height: 500px;
    background-color: #fff;
`;
