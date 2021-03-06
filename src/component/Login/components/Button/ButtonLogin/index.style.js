import styled, { keyframes } from 'styled-components';

const moveDown = keyframes`
    0% {
      opacity: 0;
      transform: translateY(-10%);
    }
  
    75% {
      opacity: 0.5;
      transform: translateY(10%);
    }
  
    100% {
      opacity: 1;
      transform: translateY(0px); 
    }
  `;

export const ButtonLogin = styled.button`
    --background: linear-gradient(45deg, #e63a0a, #ca0705);
    --color: #f6f8ff;
    --shadow: #{rgba(#00093d, 0.24)};
    --cannon-dark: #a6accd;
    --cannon-light: #f6f8ff;
    --cannon-shadow: #{rgba(#0d0f18, 0.9)};
    --confetti-1: #892ab8;
    --confetti-2: #ea4c89;
    --confetti-3: #ffff04;
    --confetti-4: #4af2fd;
    --z-before: -6;
    display: block;
    outline: none;
    cursor: pointer;
    position: relative;
    border: 0;
    background: none;
    padding: 9px 22px 9px 16px;
    line-height: 26px;
    font-family: inherit;
    font-weight: 400;
    font-size: 1.6rem;
    color: var(--color);
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    transition: transform var(--transform-duration, 0.4s);
    will-change: transform;
    transform-style: preserve-3d;
    transform: perspective(440px) rotateX(calc(var(--rx, 0) * 1deg))
        rotateY(calc(var(--ry, 0) * 1deg)) translateZ(0);
    &:hover {
        --transform-duration: 0.16s;
        text-decoration: underline;
    }
    &.success {
        --confetti-scale: 0;
        --stroke-dashoffset: 15;
    }
    &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        border-radius: 12px;
        transform: translateZ(calc(var(--z-before) * 1px));
        background: var(--background);
        box-shadow: 0 4px 8px var(--shadow);
    }

    animation: ${moveDown} 0.5s ease-out;
`;

export const Icon = styled.div`
    display: inline-block;
    vertical-align: top;
    position: relative;
    z-index: 1;

    --z: 2px;
    width: 24px;
    height: 14px;
    margin: 8px 16px 0 0;
    transform: translate(calc(var(--icon-x, 0) * 1px), calc(var(--icon-y, 0) * 1px)) translateZ(2px);
`;

export const Confetti = styled.div`
    position: absolute;
    left: 17px;
    bottom: 9px;
    svg {
        width: 18px;
        height: 16px;
        display: block;
        stroke-width: 1px;
        fill: none;
        stroke-linejoin: round;
        stroke-linecap: round;
        * {
            transition: stroke-dashoffset 0.2s;
            stroke-dasharray: 15 20;
            stroke-dashoffset: var(--stroke-dashoffset, 0);
            stroke: var(--stroke-all, var(--stroke, var(--confetti-2)));
            &:nth-child(2) {
                --stroke: var(--confetti-3);
            }
            &:nth-child(3) {
                --stroke: var(--confetti-1);
            }
        }
    }

    i {
        width: 4px;
        height: 4px;
        display: block;
        transform: scale(var(--confetti-scale, 0.5));
        position: absolute;
        transition: transform 0.25s;
        left: var(--left, -1px);
        top: var(--top, 3px);
        border-radius: var(--border-radius, 1px);
        background: var(--confetti-background, var(--confetti-3));
        &:nth-child(2) {
            --left: 9px;
            --top: -1px;
            --border-radius: 2px;
            --confetti-background: var(--confetti-4);
        }
        &:nth-child(3) {
            --left: 5px;
            --top: 3px;
            --confetti-background: var(--confetti-1);
        }
        &:nth-child(4) {
            --left: 10px;
            --top: 14px;
            --confetti-background: var(--confetti-2);
        }
        &:nth-child(5) {
            --left: 9px;
            --top: 7px;
            --confetti-background: var(--confetti-4);
        }
        &:nth-child(6) {
            --left: 6px;
            --top: 8px;
            --border-radius: 2px;
            --confetti-background: var(--confetti-2);
        }
    }
`;

export const Emitter = styled.div`
    position: absolute;
    left: 4px;
    bottom: 4px;
    pointer-events: none;
    div {
        width: 4px;
        height: 4px;
        margin: -2px 0 0 -2px;
        border-radius: 1px;
        position: absolute;
        left: 0;
        top: 0;
        transform-style: preserve-3d;
        background: var(--confetti-all, var(--b, none));
    }
`;

export const Cannon = styled.div`
    position: relative;
    width: 24px;
    height: 14px;
    transform: translate(0, 3px) rotate(-45deg);
    filter: drop-shadow(-2px 2px 2px var(--cannon-shadow));
    &:before,
    &:after {
        content: '';
        display: block;
        height: 14px;
    }
    &:before {
        background: linear-gradient(
            var(--cannon-dark),
            var(--cannon-light) 50%,
            var(--cannon-dark)
        );
        width: 100%;
        -webkit-clip-path: polygon(25px -1px, 0 52%, 25px 15px);
        clip-path: polygon(25px -1px, 0 52%, 25px 15px);
    }
    &:after {
        width: 6px;
        position: absolute;
        right: -3px;
        top: 0;
        border-radius: 50%;
        box-shadow: inset 0 0 0 0.5px var(--cannon-light);
        background: linear-gradient(90deg, var(--cannon-dark), var(--cannon-light));
    }
`;
