import styled, { keyframes } from 'styled-components';

const kShow = keyframes`
    from {
        margin-top: -36px;
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
        margin-top: -36px;
        opacity: 0;  
    }
`;
export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100vw;
    height: 100vh;
    background-color: #000;
    opacity: 0.5;
`;
export const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000000;
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
    outline: 0;
`;
export const StyledModal = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
`;
export const ModalHeader = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 8px;

    & > p {
        margin: 0;
    }
`;
export const ModalMain = styled.div`
    position: relative;
    z-index: 3;

    background: white;
    border-radius: 3px;
    min-width: 350px;
    max-width: 90vw;

    display: flex;
    flex-direction: column;

    animation: ${({ isShowing }) => (isShowing ? kShow : kHide)} 0.5s forwards;
`;
export const Title = styled.p``;
