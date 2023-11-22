import { MissionUtils } from "@woowacourse/mission-utils"
import outputView from "../../view/outputview";

class makeLotto{
    howManyLottos(countNumber){
        const arrayLottos = []
        for(let i = 0; i < countNumber; i++){
            const everyLotto = MissionUtils.Random.pickUniqueNumbersInRange(1,45,6);
            outputView.printMyLottos(everyLotto);
            arrayLottos.push(everyLotto);
        }
        return arrayLottos;
    }
}

export default makeLotto;