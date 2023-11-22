import error from "../constant/error";
import number from "../constant/number";
import { MissionUtils } from "@woowacourse/mission-utils"

class validatePrice{
    buyPrice(priceNumber){
        if(isNaN(priceNumber)){
            throw new Error(MissionUtils.Console.print(error.string));
        }
        if(!Number.isInteger(priceNumber)){
            throw new Error(MissionUtils.Console.print(error.integer));
        }
        if(priceNumber % number.oneLottoPrice !== 0){
            throw new Error(MissionUtils.Console.print(error.thousand));
        }
        if(priceNumber < number.oneLottoPrice){
            throw new Error(MissionUtils.Console.print(error.lowPrice));
        }
    }
}

export default validatePrice;