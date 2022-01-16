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
    grid-template-rows: 30px 1fr 30px;
    grid-template-columns: 1fr;
`;

const Footer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
`;

const View = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export { Game, Container, Footer, View };
