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
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 100;
    /* cursor: pointer; */
`;
