import error from "../constant/error";

class bonusValidate{
    checkBonus(bonus, getWinningNumber){
        if (isNaN(bonus)) {
            throw new Error(error.string);
        }
        if (!Number.isInteger(bonus)) {
            throw new Error(error.integer);
        }
        if (bonus < 1) {
            throw new Error(error.range);
        }
        if (bonus > 45) {
            throw new Error(error.range);
        }
        const checkDuplication = new Set([...getWinningNumber,bonus])
        if (checkDuplication.size !== 7 ){
            throw new Error(error.bonusDuplication);
        }
    }
}

export default bonusValidate;