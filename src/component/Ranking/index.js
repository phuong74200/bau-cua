import React from 'react';

import * as Styled from './index.style';

const Ranking = ({ list }) => {
    const top3 = list.slice(0, 3);
    list = list.slice(0, 3);

    return (
        <Styled.Container>
            <Styled.TopContainer>
                <Styled.TopCircle top={3}>
                    <Styled.Top>{list[2] ? list[2].name.charAt(0) : ''}</Styled.Top>
                </Styled.TopCircle>
                <Styled.TopCircle top={1}>
                    <Styled.Top>{list[0] ? list[0].name.charAt(0) : ''}</Styled.Top>
                </Styled.TopCircle>
                <Styled.TopCircle top={2}>
                    <Styled.Top>{list[1] ? list[1].name.charAt(0) : ''}</Styled.Top>
                </Styled.TopCircle>
            </Styled.TopContainer>
            <Styled.LowTopContainer>
                {list.slice(3).map((item, index) => {
                    return (
                        <Styled.LowTop key={index}>
                            <Styled.LowRight>
                                <div>{index + 3}</div>
                                <Styled.LowTopCircle>{item.name.charAt(0)}</Styled.LowTopCircle>
                                <div>{item.name}</div>
                            </Styled.LowRight>
                            <div>{item.coin} coins</div>
                        </Styled.LowTop>
                    );
                })}
            </Styled.LowTopContainer>
        </Styled.Container>
    );
};

export default Ranking;
