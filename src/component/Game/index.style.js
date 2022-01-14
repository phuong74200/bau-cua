import styled from 'styled-components';

const Game = styled.div`
    height: auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
`;

const Container = styled.div`
    display: grid;
    grid-template-columns: 1000px minmax(400px, 1fr);
    box-sizing: border-box;

    @media (max-width: 1368px) {
        grid-template-columns: 1fr;
        grid-template-rows: minmax(20px, auto) 1fr;
    }
`;

const DiceContainer = styled.div`
    gap: 30px;
    display: flex;
`;

const BoardContainer = styled.div`
    @media (max-width: 1368px) {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

const Side = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

const Center = styled.div`
    padding: 30px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    flex-direction: ${({ reverse }) => (reverse ? 'column' : 'row')};
`;

const ToolBar = styled.div`
    display: flex;
    justify-content: space-between;

    @media (max-width: 576px) {
        justify-content: flex-start;
        align-items: flex-start;
        gap: 30px;
        flex-direction: column-reverse;
    }
`;

const BtnContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Montserrat;
    font-size: 3rem;
`;

const FakeRank = styled.div`
    width: 100%;
    max-width: 1000px;
    height: 100%;
    border: 2px solid black;
`;

const CenterVertical = styled.div`
    padding: 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
`;

export {
    Container,
    DiceContainer,
    BoardContainer,
    Side,
    Center,
    ToolBar,
    BtnContainer,
    FakeRank,
    CenterVertical,
    Game,
};
