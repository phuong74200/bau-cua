import styled, { keyframes } from 'styled-components';

const Top = styled.div`
    border-radius: 50%;
    width: 100%;
    height: 100%;
    background-color: #f2f2f2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4rem;
`;

const kShow = keyframes`
    from {
        margin-top: -16px;
        opacity: 0;
    }
    to {
        margin-top: 0px;
        opacity: 1;  
    }
`;

const kHide = keyframes`
    from {
        margin-top: 0px;
        opacity: 1;
    }
    to {
        margin-top: -16px;
        opacity: 0;  
    }
`;

const Container = styled.div`
    background: #f2f2f2;
    border-radius: 20px;
    width: 500px;
    z-index: 20;
    height: auto;
    display: grid;
    padding: 16px;
    box-sizing: border-box;
    grid-template-rows: 30px 1fr;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    animation: ${({ isShow }) => (isShow ? kShow : kHide)} 1s forwards;
`;

const TopContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const TopCircle = styled.div`
    border-radius: 50%;
    width: ${({ top }) => (top === 1 ? 170 : 130)}px;
    height: ${({ top }) => (top === 1 ? 170 : 130)}px;
    background-color: transparent;
    border: 4px solid
        ${({ top }) => {
            switch (top) {
                case 1:
                    return '#f1c40f';
                case 2:
                    return '#3498d1';
                case 3:
                    return '#bb86fc';
            }
        }};
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    position: relative;

    ::before {
        content: '${({ top }) => top}';
        width: ${({ top }) => (top === 1 ? 50 : 25)}px;
        height: ${({ top }) => (top === 1 ? 50 : 25)}px;
        position: absolute;
        background: ${({ top }) => {
            switch (top) {
                case 1:
                    return '#f1c40f';
                case 2:
                    return '#3498d1';
                case 3:
                    return '#bb86fc';
            }
        }};
        bottom: 0px;
        transform: translateY(50%);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Montserrat;
        font-weight: bold;
        font-size: ${({ top }) => (top === 1 ? 2 : 1)}rem;
    }
`;

const LowTopContainer = styled.div`
    display: grid;
    flex-direction: column;
`;

const LowTop = styled.div`
    width: 100%;
    height: 60px;
    display: grid;
    grid-template-columns: 50px 1fr 250px;
`;

const LowTopCircle = styled.div`
    border-radius: 50%;
    width: 40px;
    height: 40px;
    background-color: red;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LowRight = styled.div`
    display: flex;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
`;

const Text = styled.div`
    display: flex;
    justify-content: ${({ justify }) => (justify ? justify : 'center')};
    font-weight: ${({ weight }) => (weight ? weight : 'center')};
    align-items: center;
`;

const Close = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

export {
    Top,
    Container,
    TopContainer,
    TopCircle,
    LowTopContainer,
    LowTop,
    LowTopCircle,
    LowRight,
    Text,
    Close,
};
