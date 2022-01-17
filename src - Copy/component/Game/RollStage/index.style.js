import styled from 'styled-components';

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
    display: flex;
    justify-content: center;
    align-items: center;
    display: flex;
    transform: translateY(${({ isShow }) => (isShow ? '0' : '-100%')});
    z-index: 100;
    transition: all 2s linear;
`;

const DiceContainer = styled.div`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;

    @media (max-width: 769px) {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr 1fr;
    }
`;

const Center = styled.div`
    width: 100;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export { Container, DiceContainer, Center };
