import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    height: 35rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    & > div {
        width: 80%;
        & > input {
            width: 100%;
            line-height: 2rem;
            outline: none;
        }
    }
`;
