import React from 'react';

import goldIcon from '../../../assets/money.png';
import * as Styled from './index.style';

const UserTool = ({ money }) => {
    return (
        <Styled.Container>
            <img src={goldIcon} alt="money left" />
            <div>{money}</div>
        </Styled.Container>
    );
};

export default UserTool;
