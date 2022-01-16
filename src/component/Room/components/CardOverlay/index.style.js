import styled from 'styled-components';

export const CardOverlay = styled.div`
    display: ${(props) => (props.isOpenOverlay ? 'block' : 'none')};

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 2;
`;
export const BtnCloseDialog = styled.div`
    position: absolute;
    top: 4px;
    right: 4px;
    z-index: 3;
`;
export const OverlayBody = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`;
