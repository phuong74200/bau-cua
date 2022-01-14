import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    max-width: 1000px;
    font-family: Roboto;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;

    @media (max-width: 1368px) {
        flex-direction: row;
    }
`;

export { Container };
