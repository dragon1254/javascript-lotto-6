import { MissionUtils } from "@woowacourse/mission-utils"

const outputView = {
    printCount(countNumber){
        MissionUtils.Console.print(`${countNumber}개를 구매했습니다.`);
    },

    printMyLottos(everyLotto){
        const stringLotto = everyLotto.join(', ');
        MissionUtils.Console.print(`[${stringLotto}]`);
    }
}

export default outputView;