import styled from 'styled-components';

export const StyledRoom = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100vw;
    min-height: 100vh;
    margin: 4.8rem 0;

    position: relative;
    overflow-x: hidden;
`;
export const Header = styled.h2``;
export const RoomWrapper = styled.div`
    display: grid;
    grid-template-columns: 33.33% 33.33% 33.33%;
    grid-template-rows: 400px 400px;
    row-gap: 4.8rem;

    width: 100%;
    background-color: #fff;
    margin-top: 3.2rem;
`;
export const RoomItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const GroupAction = styled.div`
    display: flex;

    & > button {
        margin: 0 0.8rem;
    }
`;
