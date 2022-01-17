import styled from 'styled-components';

export const Wrapper = styled.div`
    height: 50%;
    color: #f5f5f5;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    & > div {
        h4 {
            margin: 0.4rem 0;
            padding: 0;
        }
        input {
            margin-bottom: 0.8rem 0;
            line-height: 2rem;
            outline: none;
        }
    }
`;
