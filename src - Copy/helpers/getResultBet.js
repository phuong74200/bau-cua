const labelList = ['Cọp', 'Bầu', 'Gà', 'Tôm', 'Cá', 'Cua'];

const getResultBet = (result = [], userBet = []) => {
    const resultBet = userBet.map((betCoin, indexBet) => {
        let total = 0;
        if (betCoin > 0) {
            for (let i = 0; i < result.length; i++) {
                if (indexBet === result[i]) {
                    total += betCoin;
                }
            }
            if (total === 0) total = -betCoin;
            else total += betCoin;
        }

        return {
            name: labelList[indexBet],
            betCoin: betCoin,
            resultCoin: total,
        };
    });
    return resultBet;
};

export { labelList, getResultBet };
