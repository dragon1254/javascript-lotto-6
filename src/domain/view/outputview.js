import { MissionUtils } from "@woowacourse/mission-utils"

const outputView = {
    printCount(countNumber){
        MissionUtils.Console.print(`${countNumber}개를 구매했습니다.`);
    },

    printMyLottos(everyLotto){
        const stringLotto = everyLotto.join(', ');
        MissionUtils.Console.print(`[${stringLotto}]`);
    },
    printResultIntroduce(){
        MissionUtils.Console.print('당첨 통계')
        MissionUtils.Console.print('---')
    },
    printWinning(winCountNumber){
        const winCountNumberArray = Object.values(winCountNumber)
        MissionUtils.Console.print(`3개 일치 (5,000원) - ${winCountNumberArray[0]}개`)
        MissionUtils.Console.print(`4개 일치 (50,000원) - ${winCountNumberArray[1]}개`)
        MissionUtils.Console.print(`5개 일치 (1,500,000원) - ${winCountNumberArray[2]}개`)
        MissionUtils.Console.print(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${winCountNumberArray[3]}개`)
        MissionUtils.Console.print(`6개 일치 (2,000,000,000원) - ${winCountNumberArray[4]}개`)
    },
    printRate(getRate){
        const percentRate = getRate * 100;
        const percentRateToFixed = percentRate.toFixed(1);
        MissionUtils.Console.print(`총 수익률은 ${percentRateToFixed}%입니다.`);
    }
}

export default outputView;