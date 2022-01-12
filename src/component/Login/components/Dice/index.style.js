import styled, { keyframes } from 'styled-components';

const animate = keyframes` 
  20%{
    transform: rotateX(45deg) rotateY(65deg) rotateZ(35deg);
    top: 0%;
  }
  40%{
    transform: rotateX(45deg) rotateY(65deg) rotateZ(135deg);
    top: 30%;
  }
  60%{
    transform: rotateX(76deg) rotateY(56deg) rotateZ(246deg);
    top: 35%;
  }
  90% {
    transform: rotateX(180deg) rotateY(-80deg) rotateZ(-50deg);
    top: 40%;
  }
  `;
const animate2 = keyframes` 
  20%{
    transform: rotateX(-45deg) rotateY(-65deg) rotateZ(35deg);
    top: 0%;
  }
  40%{
    transform: rotateX(-145deg) rotateY(-165deg) rotateZ(135deg);
    top: 30%;
  }
  60%{
    transform: rotateX(-276deg) rotateY(-256deg) rotateZ(246deg);
    top: 35%;
  }
  90% {
    transform: rotateX(-180deg) rotateY(80deg) rotateZ(-50deg);
    top: 40%;
  }
  `;

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateX(40px);

    height: 100px;
`;
export const Cube = styled.div`
    position: relative;
    top: 100%;

    height: 50px;
    width: 50px;
    transform-style: preserve-3d;
    cursor: pointer;
    transform: rotateX(135deg) rotateY(-217deg) rotateZ(-88deg);
    animation: ${animate} 3s linear;

    & div {
        position: absolute;
        box-sizing: border-box;
        padding: 10px;
        height: 100%;
        width: 100%;
        color: #fff;
        border: 2px solid #000;
    }
`;
export const Front = styled.div`
    background: #000;
    transform: translateZ(-50px);
    background-color: red;
`;
export const Back = styled.div`
    background: #000;
    transform: translateZ(-100px) rotateY(180deg);
    background-color: yellow;
`;
export const Top = styled.div`
    background: #000;
    transform-origin: top center;
    transform: rotateX(-270deg) translateY(-100px);
    background-color: green;
`;
export const Left = styled.div`
    background: #000;
    transform-origin: center left;
    transform: rotateY(270deg) translateX(-100px);
    background-color: blue;
`;
export const Right = styled.div`
    background: #000;
    transform-origin: top right;
    transform: rotateY(-270deg) translateX(100px);
    background-color: orange;
`;
export const Bottom = styled.div`
    background: #000;
    transform-origin: bottom center;
    transform: rotateX(270deg) translateY(100px);
    background-color: violet;
`;
