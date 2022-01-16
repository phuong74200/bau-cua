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
        background: #f6eabe;
    }

    .front {
        transform: rotateX(-180deg) translateZ(-${({ size }) => size / 2}px) scaleY(-1);
        background: #d9d7f1;
    }

    .right {
        transform: rotateY(-90deg) translateZ(-${({ size }) => size / 2}px);
        background: #d5ecc2;
    }

    .left {
        transform: rotateY(90deg) translateZ(-${({ size }) => size / 2}px);
        background: #f4c7ab;
    }

    .top {
        transform: rotateX(-90deg) translateZ(-${({ size }) => size / 2}px) scaleY(-1);
        background: #f7dad9;
    }

    .bottom {
        transform: rotateX(90deg) translateZ(-${({ size }) => size / 2}px);
        background: #d6e5fa;
    }

    div {
        position: absolute;
        width: ${({ size }) => size}px;
        height: ${({ size }) => size}px;
        box-sizing: border-box;

        img {
            object-fit: cover;
            max-width: 100%;
            max-height: 100%;
            transform: scale(0.5);
        }
    }
`;

export { Cube, Container };
