import { MissionUtils } from "@woowacourse/mission-utils"
import message from "../model/constant/message";
import validatePrice from "../model/validate/priceValidate";

const inputView = {
    async getPrice(){
        const buyPrice = await MissionUtils.Console.readLineAsync(message.price);
        return buyPrice;
    },
}

export default inputView;