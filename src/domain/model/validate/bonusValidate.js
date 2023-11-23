import error from "../constant/error";
import number from "../constant/number";
import { MissionUtils } from "@woowacourse/mission-utils"

class bonusValidate{
    checkBonus(bonus, getWinningNumber){
        if (isNaN(bonus)) {
            throw new Error(error.string);
        }
        if (!Number.isInteger(bonus)) {
            throw new Error(error.integer);
        }
        if (bonus < number.minLotto) {
            throw new Error(error.range);
        }
        if (bonus > number.maxLotto) {
            throw new Error(error.range);
        }
        const checkDuplication = new Set([...getWinningNumber,bonus])
        if (checkDuplication.size !== number.bonusAndWinningLength ){
            throw new Error(error.bonusDuplication);
        }
    }
}

export default bonusValidate;