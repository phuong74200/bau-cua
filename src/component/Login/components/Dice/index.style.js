import { down } from 'styled-breakpoints';
import styled, { keyframes } from 'styled-components';

const animate = keyframes`
  25%{
    transform: rotateX(45deg) rotateY(65deg) rotateZ(35deg);
    top: -200%;
  }
  50%{
    transform: rotateX(145deg) rotateY(165deg) rotateZ(135deg);
    top: -100%;
  }
  75%{
    transform: rotateX(276deg) rotateY(256deg) rotateZ(246deg);
    top: 0%;
  }
  100%{
    transform: rotateX(376deg) rotateY(356deg) rotateZ(346deg);
    top: 100%;
  }
  `;

const animateMobile = keyframes` 
0%{
  transform: rotateX(135deg) rotateY(-217deg) rotateZ(-88deg);
    top: -200%;
  }
  25%{
    transform: rotateX(50deg) rotateY(50deg) rotateZ(85deg);
    top: -100%;
  }
  75%{
    transform: rotateX(100deg) rotateY(100deg) rotateZ(196deg);
    top: 0%;
  }
  100%{
    transform: rotateX(150deg) rotateY(150deg) rotateZ(296deg);
    top: 100%;
  }
  `;

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateX(40px);

    height: 100px;
    perspective: 1000px;
    perspective-origin: 50% 50%;
`;
export const Cube = styled.div`
    position: relative;
    top: 100%;

    height: 100px;
    width: 100px;
    transform-style: preserve-3d;
    transform: rotateX(135deg) rotateY(-217deg) rotateZ(-88deg);
    transition: all 1s linear 0s;
    animation: 1.4s linear 0s 1 normal running ${animate};

    ${down('md')} {
        height: 50px;
        width: 50px;
        animation: 1.4s linear 0s 1 normal running ${animateMobile};
    }

    & div {
        position: absolute;
        box-sizing: border-box;
        background-size: cover;

        padding: 10px;
        height: 100%;
        width: 100%;
        color: #fff;
        border: 1px solid #000;
        border-radius: 5px;
        /* background-color: #fff; */
    }
`;
export const Front = styled.div`
    background: #000;
    transform: translateZ(0px);
    background-color: #a1cae2;

    ${down('md')} {
        transform: translateZ(-50px);
    }
`;
export const Back = styled.div`
    background: #000;
    transform: translateZ(-100px) rotateY(180deg);
    background-color: #a685e2;
`;
export const Top = styled.div`
    background: #000;
    transform-origin: top center;
    transform: rotateX(-270deg) translateY(-100px);
    background-color: #ffb677;
`;
export const Left = styled.div`
    background: #000;
    transform-origin: center left;
    transform: rotateY(270deg) translateX(-100px);
    background-color: #ffc4d0;
`;
export const Right = styled.div`
    background: #000;
    transform-origin: top right;
    transform: rotateY(-270deg) translateX(100px);
    background-color: #ffaaa5;
`;
export const Bottom = styled.div`
    background: #000;
    transform-origin: bottom center;
    transform: rotateX(270deg) translateY(100px);
    background-color: #caf7e3;
`;
