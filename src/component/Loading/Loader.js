import { BallTriangle, TailSpin, Rings } from 'react-loader-spinner';
import styled, { keyframes } from 'styled-components';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default function Loader() {
    return <TailSpin color="#e74c3c" height={80} width={80} />;
}
const spin = keyframes` 0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
    `;
const CircleLoader = styled.div`
    border: 10px solid #f3f3f3; /* Light grey */
    border-top: 10px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 70px;
    box-sizing: border-box;
    height: 70px;
    animation: ${spin} 2s linear infinite;
`;
export const SimpleCircleLoader = () => {
    return <CircleLoader />;
};
export const PuffLoader = () => {
    return <Loader type="Puff" color="#00BFFF" height={100} width={100} />;
};
