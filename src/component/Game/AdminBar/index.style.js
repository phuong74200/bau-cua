import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    width: auto;
    height: 100%;
    gap: 10px;
`;

const Button = styled.button`
    background: ${({ bgColor }) => (bgColor ? bgColor : '#d3e4cd')};
    padding: 8px;
    height: 100%;
    width: auto;
    font-family: Montserrat;
    border: none;
    color: #616161;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.5rem;
    transition: all 0.1s;

    :hover {
        filter: brightness(95%);
    }
`;

export { Button, Container };
