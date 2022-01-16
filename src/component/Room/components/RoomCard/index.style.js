import styled, { keyframes } from 'styled-components';

import { moveDown } from '../../../Login/components/Button/ButtonBase/index.style';

export const CardWrapper = styled.div`
    background-color: #fff;
    width: 28rem;
    height: 40rem;
    border-radius: 20px;
    box-shadow: 0px 0px 5px 2px #dfe2e6;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;

    position: relative;
    transition: all 0.2s linear;
    animation: ${moveDown} 0.5s ease-out;

    &:hover {
        transform: translateY(-10px);
        box-shadow: 0px 0px 5px 10px #dfe2e6;

        .card__option {
            opacity: 1;
        }
    }
`;

export const CardImage = styled.div`
    width: 250px;
    height: 250px;

    background-repeat: no-repeat;
    background-size: contain;
    background-position: top;
    aspect-ratio: 3/2;
`;
export const CardContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > h3 {
        width: 90%;
        height: 3.6rem;
        margin: 0.4rem 0;
        line-height: 1.8rem;
        text-align: center;

        display: block;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
`;
export const CardAction = styled.div`
    margin-top: 0.4rem;
    margin-bottom: 1.2rem;
`;
export const CardOption = styled.div`
    opacity: 0;
    position: absolute;
    top: 8px;
    z-index: 1;

    animation: ${moveDown} 0.5s ease-out;
`;
export const ListAction = styled.div`
    display: ${(props) => (props.isOpenCardOption ? 'block' : 'none')};
    position: absolute;
    left: -5em;
    top: 150%;

    width: 20rem;
    border-radius: 5px;
    box-shadow: 0px 0px 5px 2px #dfe2e6;
    background-color: #fff;
    list-style: none;
    overflow: hidden;

    & > hr {
        margin: 0;
    }

    & > li {
        width: 100%;
        padding: 0.8rem 0;
        text-align: center;
        transform: scale(1);
        transition: all 0.3s;
        transition-timing-function: ease-in-out;

        cursor: pointer;

        &:hover {
            transform: scale(1.1);
            background-color: #dfe2e6;
        }
    }

    & > li:last-child {
        border-top: 1px solid #000;
    }
`;

export const Slot = styled.div`
    max-width: 100%;
    width: 250px;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        max-width: 100px;
        max-height: 100%;
        object-fit: contain;
    }
`;

export const Plate = styled.div`
    width: 200px;
    height: 200px;
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

export const fRotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

export const Layer = styled.div`
    transform-origin: center;
    width: 195px;
    height: 195px;
    position: absolute;
    animation: ${fRotate} ${({ duration }) => duration}s linear infinite;
`;

export const Icon = styled.div`
    position: absolute;
`;

export const TagContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
`;

export const Tag = styled.div`
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

export const kPut = keyframes`
    from {
        opacity: 0;
        transform: translateY(-50px);
    }
    to {
        transform: translateY(0px);
        opacity: 0.8;
    }
`;

export const TagShadow = styled.div.attrs(({ position, bet }) => ({
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
