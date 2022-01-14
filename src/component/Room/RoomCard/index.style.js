import styled from 'styled-components';

export const CardWrapper = styled.div`
    background-color: #fff;
    width: 280px;
    height: 400px;
    border-radius: 20px;
    box-shadow: 0px 0px 5px 2px #dfe2e6;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    position: relative;
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
export const CardOverlay = styled.div`
    /* position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 2; */
`;
export const OverlayBoby = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`;
export const CardOption = styled.div`
    position: absolute;
    top: 8px;
    z-index: 100;
`;
