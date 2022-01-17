import React from 'react';

import { Tag } from '../../Game/Board/index.style';
import * as Styled from './index.style';

function ResultDialog({ resultData }) {
    return resultData.length > 0 ? (
        <Styled.Container>
            <Styled.List>
                {resultData.map((result) =>
                    result.betCoin ? (
                        <li key={result.name}>
                            <div>
                                <span>Bạn đã đặt</span>
                                <Tag bet={result.betCoin}>{result.betCoin}</Tag>
                                <span>
                                    đồng vào <b>{result.name}</b>
                                </span>
                            </div>
                            <Styled.ResultWrapper status={result.resultCoin > 0 ? 'win' : 'lose'}>
                                <span>{result.resultCoin > 0 ? 'Thắng' : 'Thua'} </span>
                                <Tag bet={result.resultCoin}>{result.resultCoin}</Tag>
                                <span>đồng</span>
                            </Styled.ResultWrapper>
                        </li>
                    ) : null
                )}
            </Styled.List>
        </Styled.Container>
    ) : null;
}

export default ResultDialog;
