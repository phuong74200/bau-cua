import React from 'react';

import * as Styled from './index.style';

export const ButtonBase = (props) => {
    const { children, ...rest } = props;
    return <Styled.Button {...rest}>{children}</Styled.Button>;
};

export default ButtonBase;
