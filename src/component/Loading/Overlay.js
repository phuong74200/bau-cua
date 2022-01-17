import styled from 'styled-components';

export const Overlay = styled.div`
    position: fixed;
    justify-content: center;
    align-items: center;
    display: flex;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
    z-index: 10000;
    /* cursor: pointer; */
`;
