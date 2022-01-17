import { down } from 'styled-breakpoints';
import styled from 'styled-components';

export const Login = styled.div`
    height: auto;
    width: 100vw;

    ${down('md')} {
        height: 100vh;
        background-size: contain;
        background-repeat: repeat;
    }
`;

export const BoardBackground = styled.div`
    width: 100%;
    & > div {
        width: 100vw;
        height: auto;
        max-width: none;
        min-height: 100vh;
    }
`;

export const LoginMain = styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`;

export const BannerLeft = styled.div`
    position: fixed;
    top: 0;
    left: -20px;
    bottom: 0;
    text-align: left;

    & > div {
        position: relative;
        height: fit-content;
        width: fit-content;
    }

    img:first-child {
        height: 80vh;
        width: auto;
    }
    ${down('md')} {
        img:first-child {
            height: auto;
            width: auto;
        }
    }
`;
export const BannerRight = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    text-align: right;

    & > img:first-child {
        height: 80vh;
        width: auto;
    }
    ${down('md')} {
        img:first-child {
            height: auto;
            width: auto;
        }
    }
`;
export const BannerBottom = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    align-items: flex-end;

    & > div {
        position: absolute;
        bottom: 0;
        width: 100vw;
        height: 80px;
    }
`;

export const DiceWrapper = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-around;
`;
export const ButtonLoginWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3.2rem;

    & > button {
        height: 5rem;
        padding: 0.8rem 3.2rem;
        cursor: pointer;
    }
`;
