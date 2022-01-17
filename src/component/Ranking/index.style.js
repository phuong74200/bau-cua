import styled from 'styled-components';

const Top = styled.div`
    border-radius: 50%;
    width: 100%;
    height: 100%;
    background-color: #f2f2f2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4rem;
`;

const Container = styled.div`
    border-radius: 20px;
    background: #fbf3e6;
    width: 100%;
    height: fit-content;
    display: grid;
    grid-template-rows: 300px 1fr;
    padding: 16px;
    box-sizing: border-box;
`;

const TopContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const TopCircle = styled.div`
    border-radius: 50%;
    width: ${({ top }) => (top === 1 ? 170 : 130)}px;
    height: ${({ top }) => (top === 1 ? 170 : 130)}px;
    background-color: transparent;
    border: 4px solid
        ${({ top }) => {
            switch (top) {
                case 1:
                    return '#f1c40f';
                case 2:
                    return '#3498d1';
                case 3:
                    return '#bb86fc';
            }
        }};
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    position: relative;

    ::before {
        content: '${({ top }) => top}';
        width: ${({ top }) => (top === 1 ? 50 : 25)}px;
        height: ${({ top }) => (top === 1 ? 50 : 25)}px;
        position: absolute;
        background: ${({ top }) => {
            switch (top) {
                case 1:
                    return '#f1c40f';
                case 2:
                    return '#3498d1';
                case 3:
                    return '#bb86fc';
            }
        }};
        bottom: 0px;
        transform: translateY(50%);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Montserrat;
        font-weight: bold;
        font-size: ${({ top }) => (top === 1 ? 2 : 1)}rem;
    }
`;

const LowTopContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const LowTop = styled.div`
    width: 100%;
    height: auto;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const LowTopCircle = styled.div`
    border-radius: 50%;
    width: 40px;
    height: 40px;
    background-color: red;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LowRight = styled.div`
    display: flex;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
`;

export { Top, Container, TopContainer, TopCircle, LowTopContainer, LowTop, LowTopCircle, LowRight };
