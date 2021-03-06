import { down } from 'styled-breakpoints';
import styled, { keyframes } from 'styled-components';

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

    min-width: 992px;
    ${down('md')} {
        min-width: 100%;
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
        content: '${({ name }) => name}';
        width: auto;
        height: auto;
        background-color: white;
        top: -15px;
        left: 8px;
        padding: 0px 8px;
        font-size: 1.1rem;
        min-width: 50px;
    }

    &:hover {
        cursor: pointer;
    }

    @media (max-width: 992px) {
        display: none;
    }
`;

const Sides = styled.div`
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr 50px;

    @media (max-width: 992px) {
        grid-template-columns: 1fr;
    }
`;

const ToolBar = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const MiniBtn1 = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    box-sizing: border-box;
    background: ${({ clickable }) => (clickable ? '#616161' : 'white')};
    border: 1px solid #616161;
    color: ${({ clickable }) => (clickable ? '#f2f2f2' : '#616161')};
    cursor: ${({ clickable }) => (clickable ? 'pointer' : 'auto')};

    div {
        display: none;
        white-space: nowrap;
        position: absolute;
        justify-content: center;
        align-items: center;
        width: auto;
        max-height: 50px;
        padding: 8px;
        box-sizing: border-box;
        left: calc(100%);
        background: #616161;
        color: #f2f2f2;
        z-index: 3;
        border-radius: 8px;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        transition: all 0.3s;
    }

    :hover {
        div {
            display: flex;
            left: calc(100% + 13px);
        }
    }
`;

const MiniBtn = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    border-radius: 8px;
    overflow: hidden;
    width: auto;
    height: 100%;
    gap: 1px;
    color: white;
    cursor: ${({ isConfirm }) => (isConfirm ? 'not-allowed' : 'pointer')};
    opacity: ${({ isConfirm }) => (isConfirm ? 0.5 : 1)};
    pointer-events: ${({ isConfirm }) => (isConfirm ? 'none' : 'auto')};
`;

const CenterIcon = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 12px;
    box-sizing: border-box;
    background: ${({ bgColor }) => (bgColor ? bgColor : '#3498db')};
`;

const FixLayer = styled.div`
    position: fixed;
    width: 100vw;
    pointer-events: none;
    user-select: none;
    z-index: 200;
    height: 100vh;
`;

export {
    Game,
    Container,
    Footer,
    View,
    Button,
    Box,
    TextField,
    Sides,
    ToolBar,
    MiniBtn,
    FixLayer,
    CenterIcon,
};
