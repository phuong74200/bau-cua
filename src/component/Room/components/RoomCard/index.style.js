import styled from 'styled-components';

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
    text-align: center;

    & > h3 {
        margin: 0.4rem 0;
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
