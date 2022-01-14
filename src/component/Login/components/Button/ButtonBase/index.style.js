import styled, { keyframes } from 'styled-components';

export const moveDown = keyframes`
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

export const Button = styled.button`
    position: relative;

    display: flex;
    justify-content: space-evenly;
    align-items: center;

    width: ${(props) => props.width || 'auto'};
    padding: ${(props) => props.padding || '8px'};
    border-radius: 10px;
    border: ${(props) => props.border || 'none'};
    outline: none;

    font-size: 14px;
    text-decoration: none;

    background: linear-gradient(90deg, #e63a0a, #ca0705);
    color: ${(props) => props.text_color || '#000'};
    animation: ${moveDown} 0.5s ease-out;

    cursor: pointer;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    }

    &:active {
        transform: translateY(1px);
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    }

    &:hover::after {
        transform: scaleX(1.4) scaleY(1.6);
        opacity: 0;
    }

    &::after {
        content: '';
        display: ${(props) => (props.animation ? 'inline-block' : 'none')};
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;

        height: 100%;
        width: 100%;
        border-radius: 10px;

        background: linear-gradient(270deg, rgba(202, 7, 5, 0.5), rgba(230, 58, 10, 0.5));
        //background-color: ${(props) => props.background_color || '#fff'};
        color: ${(props) => props.text_color || '#000'};

        transition: all 0.5s;
    }
`;
