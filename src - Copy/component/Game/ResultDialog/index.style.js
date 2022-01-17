import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
    z-index: 100;

    min-width: 60vw;
    min-height: 60vh;
    height: auto;
    background-color: #fbf3e6;
`;
export const List = styled.ul`
    list-style: none;
    padding: 1.6rem 0;

    & > li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.8rem 8rem;
    }

    & > li > div {
        display: flex;
        align-items: center;
        justify-content: center;

        & > span {
            padding: 0 0.8rem;
        }
    }
`;

export const ResultWrapper = styled.div`
    width: 20rem;
    height: 4rem;
    border-radius: 5px;
    background-color: ${(props) => (props.status === 'win' ? '#07bc0c' : '#FF7878')};
`;
