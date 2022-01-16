import styled from 'styled-components';

const Game = styled.div`
    width: auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    font-family: Montserrat;
`;

const Container = styled.div`
    display: grid;
    grid-template-rows: 50px 1fr 50px;
    grid-template-columns: 1fr;
    gap: 10px;
`;

const Footer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    box-sizing: border-box;
    justify-content: ${({ justify }) => justify || 'space-between'};
    align-items: center;
    gap: 10px;
`;

const View = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Button = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    padding: 8px;
    box-sizing: border-box;
    background-color: ${({ status }) => (status === 'close' ? '#F38BA0' : '#C9E4C5')};
`;

export { Game, Container, Footer, View, Button };
