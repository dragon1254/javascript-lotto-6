import { MissionUtils } from "@woowacourse/mission-utils"
import message from "../model/constant/message";
import validatePrice from "../model/validate/priceValidate";

const inputView = {
    async getPrice(){
        const buyPrice = await MissionUtils.Console.readLineAsync(message.price);
        return buyPrice;
    },
    async getWinning(){
        const winningNumber = await MissionUtils.Console.readLineAsync(message.winning);
        return winningNumber;
    },
    async getBounus(){
        const bonusNumber = await MissionUtils.Console.readLineAsync(message.bonus);
        return bonusNumber;
    }
}

export default inputView;