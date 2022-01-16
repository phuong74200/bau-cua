import styled, { keyframes } from 'styled-components';

const Grid = styled.div`
    display: grid;
    max-width: 1280px;
    height: auto;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    background: #fbf3e6;
    gap: 50px;
    box-sizing: border-box;
    padding: 50px;
    border-radius: 20px;

    @media (max-width: 1280px) {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        padding: 0.5px;
    }

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        grid-template-rows: repeat(6, 1fr);
    }
`;

const Slot = styled.div`
    max-width: 100%;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        max-width: 100px;
        max-height: 100%;
        object-fit: contain;
    }
`;

const Plate = styled.div`
    width: 300px;
    height: 300px;
    background: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
    transition: all 0.3s;
    :hover {
        background: ${({ hoverColor }) => hoverColor};
    }
`;

const fRotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const Layer = styled.div`
    transform-origin: center;
    width: 195px;
    height: 195px;
    position: absolute;
    animation: ${fRotate} ${({ duration }) => duration}s linear infinite;
`;

const Icon = styled.div`
    position: absolute;
`;

const TagContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
`;

const Tag = styled.div`
    border-radius: 50%;
    font-family: Montserrat;
    width: 35px;
    height: 35px;
    background: ${({ bet }) => {
        if (bet > 15) {
            return '#FDFFBC';
        }
        if (bet > 13) {
            return '#FFBCBC';
        }
        if (bet > 11) {
            return '#F7D59C';
        }
        if (bet > 9) {
            return '#F0D9FF';
        }
        if (bet > 7) {
            return '94DAFF';
        }
        if (bet > 5) {
            return '#C9E4C5';
        }
        return '#f2f2f2';
    }};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    border: 2px solid #eaecee;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
        rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;

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
    transition: all 1s;
`;

const kPut = keyframes`
    from {
        opacity: 0;
        transform: translateY(-50px);
    }
    to {
        transform: translateY(0px);
        opacity: 0.8;
    }
`;

const TagShadow = styled.div.attrs(({ position, bet }) => ({
    style: {
        top: `calc(${position.y}% - 25px)`,
        left: `calc(${position.x}% - 25px)`,
        zIndex: bet,
        zoom: bet / 20 >= 1.7 ? 1.7 : bet / 20 <= 1 ? 1 : bet / 20,
    },
}))`
    transform: translateY(-50px);
    animation: ${kPut} 2s forwards;
    position: absolute;
    width: auto;
    height: auto;
    border-radius: 50%;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    transition: all 1s;
`;

export { Grid, Slot, Plate, Layer, Icon, TagContainer, Tag, TagShadow };
