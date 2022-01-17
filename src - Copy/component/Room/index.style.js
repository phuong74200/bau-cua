import { up, down, between } from 'styled-breakpoints';
import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw;
`;

export const StyledRoom = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    max-width: 1200px;
    min-height: 100vh;
    padding: 4.8rem 0;

    margin: 0 auto;
    position: relative;
    overflow-x: hidden;
`;
export const Header = styled.h2`
    text-align: center;
    ${down('sm')} {
        margin: 0 1.6rem 1.6rem 1.6rem;
    }
`;
export const RoomWrapper = styled.div`
    display: grid;
    grid-template-columns: 33.33% 33.33% 33.33%;
    grid-template-rows: 400px;
    row-gap: 4.8rem;

    min-width: 100%;
    background-color: #fff;
    margin-top: 3.2rem;

    ${between('sm', 'md')} {
        grid-template-columns: 50% 50%;
    }
    ${down('sm')} {
        grid-template-columns: 100%;
    }
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

    @media (max-width: 320px) {
        display: block;

        & > button {
            margin: 0.8rem 0;
        }
    }
`;
