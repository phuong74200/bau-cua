import styled from 'styled-components';

const Board = styled.div`
    max-width: 1000px;
    height: auto;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid black;

    img {
        object-fit: fill;
        width: 100%;
        height: auto;
    }
`;

const Grid = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
`;

const Tag = styled.div.attrs(({ position, bet }) => ({
    style: {
        top: `calc(${position.y}% - 25px)`,
        left: `calc(${position.x}% - 25px)`,
        zIndex: bet,
        zoom: bet / 20 >= 2 ? 2 : bet / 20 <= 1 ? 1 : bet / 20,
    },
}))`
    border-radius: 50%;
    font-family: Montserrat;
    width: 35px;
    height: 35px;
    background: ${({ color }) => color};
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    border: 2px solid #eaecee;
    -webkit-box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.75) inset;
    -moz-box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.75) inset;
    box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.75) inset;

    @media (max-width: 1368px) {
        width: 30px;
        height: 30px;
    }
    @media (max-width: 768px) {
        width: 30px;
        height: 30px;
        font-size: 0.8rem;
    }
    @media (max-width: 576px) {
        width: 20px;
        height: 20px;
        font-size: 0.6rem;
    }
`;

const Slot = styled.div`
    position: relative;
`;

export { Board, Grid, Slot, Tag };
