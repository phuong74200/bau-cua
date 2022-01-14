import styled from 'styled-components';

const Container = styled.div`
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    position: relative;
    perspective: 3000px;
`;

const Cube = styled.div.attrs(({ rotate, size }) => ({
    style: {
        transform: `translateZ(-${size / 2}px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
    },
}))`
    width: 100%;
    height: 100%;
    position: absolute;
    transform-style: preserve-3d;
    transition: 7s cubic-bezier(0, 0.36, 0, 0.99);

    .back {
        transform: translateZ(-${({ size }) => size / 2}px);
        background: red;
    }

    .front {
        transform: rotateX(-180deg) translateZ(-${({ size }) => size / 2}px) scaleY(-1);
        background: green;
    }

    .right {
        transform: rotateY(-90deg) translateZ(-${({ size }) => size / 2}px);
        background: blue;
    }

    .left {
        transform: rotateY(90deg) translateZ(-${({ size }) => size / 2}px);
        background: yellow;
    }

    .top {
        transform: rotateX(-90deg) translateZ(-${({ size }) => size / 2}px) scaleY(-1);
        background: #f2f2f2;
    }

    .bottom {
        transform: rotateX(90deg) translateZ(-${({ size }) => size / 2}px);
        background: black;
    }

    div {
        background: red;
        position: absolute;
        width: ${({ size }) => size}px;
        height: ${({ size }) => size}px;
        box-sizing: border-box;
        border: 2px solid black;

        img {
            object-fit: cover;
            max-width: 100%;
            max-height: 100%;
        }
    }
`;

export { Cube, Container };
