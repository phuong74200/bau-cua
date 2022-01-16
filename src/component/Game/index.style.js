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
    z-index: 1;

    @media (max-width: 1280px) {
        position: sticky;
        top: ${({ top }) => top}px;
        left: ${({ left }) => left}px;
        bottom: ${({ bottom }) => bottom}px;
        right: ${({ right }) => right}px;
        justify-content: space-between;
    }

    @media (max-width: 768px) {
        position: sticky;
        top: ${({ top }) => top}px;
        left: ${({ left }) => left}px;
        bottom: ${({ bottom }) => bottom}px;
        right: ${({ right }) => right}px;
    }
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
    border-radius: 8px;
    box-sizing: border-box;
    padding: 8px;
    height: 100%;
    width: auto;
    background-color: ${({ bgColor }) => (bgColor ? bgColor : '#fbf3e6')};
    cursor: ${({ isClick }) => (isClick ? 'pointer' : 'auto')};
    font-size: 1.5rem;
`;

const Box = styled.div`
    display: flex;
    width: auto;
    height: 100%;
    gap: 10px;
`;

const TextField = styled.div`
    border: 1px solid #616161;
    box-sizing: border-box;
    border-radius: 8px;
    padding: 8px;
    width: auto;
    outline: none;
    position: relative;

    ::before {
        position: absolute;
        content: 'ROOM ID';
        width: auto;
        height: auto;
        background-color: white;
        top: -15px;
        left: 8px;
        padding: 0px 4px;
        font-size: 1rem;
    }
`;

const Sides = styled.div`
    display: grid;
    grid-template-columns: 1fr 300px;
    grid-template-rows: 1fr;
`;

export { Game, Container, Footer, View, Button, Box, TextField, Sides };
