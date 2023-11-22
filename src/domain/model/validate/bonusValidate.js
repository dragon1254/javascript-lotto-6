import error from "../constant/error";
import number from "../constant/number";
import { MissionUtils } from "@woowacourse/mission-utils"

class bonusValidate{
    checkBonus(bonus, getWinningNumber){
        if (isNaN(bonus)) {
            throw new Error(MissionUtils.Console.print(error.string));
        }
        if (!Number.isInteger(bonus)) {
            throw new Error(MissionUtils.Console.print(error.integer));
        }
        if (bonus < number.minLotto) {
            throw new Error(MissionUtils.Console.print(error.range));
        }
        if (bonus > number.maxLotto) {
            throw new Error(MissionUtils.Console.print(error.range));
        }
        const checkDuplication = new Set([...getWinningNumber,bonus])
        if (checkDuplication.size !== number.bonusAndWinningLength ){
            throw new Error(MissionUtils.Console.print(error.bonusDuplication));
        }
    }
}

export default bonusValidate;