import styled from 'styled-components';

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
    z-index: 2;
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
`;
export const Title = styled.p``;
