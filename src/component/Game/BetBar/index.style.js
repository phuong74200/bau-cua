import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    gap: 20px;
    flex-direction: column;
    justify-content: flex-end;
`;

const Side = styled.div`
    width: 40px;
    height: 40px;
    position: relative;

    img {
        object-fit: cover;
        max-width: 100%;
        max-height: 100%;
    }

    ::after {
        right: -10px;
        top: 0px;
        z-index: 1;
        font-weight: bold;
        position: absolute;
        background: white;
        display: flex;
        font-size: 1rem;
        justify-content: center;
        align-items: center;
        content: '${({ qualities }) => qualities}';
        width: 20px;
        height: 20px;
        border: 2px solid #f2f2f2;
        border-radius: 50%;
    }
`;

export { Container, Side };
