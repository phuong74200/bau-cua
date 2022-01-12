import styled from 'styled-components';

export const Login = styled.div`
    height: 80vh;
`;

export const LoginMain = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`;

export const BannerLeft = styled.div`
    position: fixed;
    top: 0;
    left: 0;

    text-align: left;
`;
export const BannerRight = styled.div`
    position: fixed;
    top: 0;
    right: 0;

    text-align: right;
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
