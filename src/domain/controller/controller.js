import number from "../model/constant/number";
import makeLotto from "../model/utils/makeLotto";
import makeNumbers from "../model/utils/makeNumbers";
import Lotto from "../model/validate/Lotto";
import validatePrice from "../model/validate/priceValidate";
import inputView from "../view/inputview";
import outputView from "../view/outputview";

class controller{
#price

#myLottos = [];

#winningNumber

#bonusNumber
    constructor(){

    }
    async run(){
        await this.priceAndLottos();
        await this.getWinningBonusNumber();
    }
    async priceAndLottos(){
        try{
            const buyPriceNumber = await inputView.getPrice();
            const priceNumber = Number(buyPriceNumber)
            const checkPrice = new validatePrice();
            checkPrice.buyPrice(priceNumber);
            this.#price = buyPriceNumber;
        } catch(err) {
            return await this.priceAndLottos();
        }
        const countNumber = this.#price / number.oneLottoPrice
        outputView.printCount(countNumber);
        this.buyLotto(countNumber);
    }

    buyLotto(countNumber){
        const publishLottos = new makeLotto();
        const getMyLottos = publishLottos.howManyLottos(countNumber);
        this.#myLottos = getMyLottos;
    }
    async getWinningBonusNumber(){
        const makeWinningAndBonus = new makeNumbers();
        const getWinningNumber = await makeWinningAndBonus.winningNumbers();
        this.#winningNumber = getWinningNumber;
        const getBonusNumber = await makeWinningAndBonus.bonusNumber(getWinningNumber);
        this.#bonusNumber = getBonusNumber;
    }


}

export default controller;