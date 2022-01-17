import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    gap: 10px;
`;

const Side = styled.div`
    display: grid;
    grid-template-columns: 40px 40px;

    img {
        width: 40px;
        height: 40px;
    }
`;

const Text = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export { Container, Side, Text };
