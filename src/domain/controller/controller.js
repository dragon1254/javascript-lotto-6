import number from "../model/constant/number";
import calculateRate from "../model/utils/calculateRate";
import calculateWin from "../model/utils/calculateWin";
import makeLotto from "../model/utils/makeLotto";
import makeNumbers from "../model/utils/makeNumbers";
import validatePrice from "../model/validate/priceValidate";
import inputView from "../view/inputview";
import outputView from "../view/outputview";

class controller{
#price

#myLottos = [];

#winningNumber

#bonusNumber

    async run(){
        await this.priceAndLottos();
        await this.getWinningBonusNumber();
        this.calculateWinCount();
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
    calculateWinCount(){
        const winCalculator = new calculateWin(this.#myLottos,this.#winningNumber,this.#bonusNumber);
        const winCountNumber = winCalculator.winCount();
        const rateCalculator = new calculateRate(this.#price)
        const getRate = rateCalculator.makeRate(winCountNumber)
        this.printResult(winCountNumber, getRate)
    }
    printResult(winCountNumber, getRate){
        outputView.printResultIntroduce();
        outputView.printWinning(winCountNumber);
        outputView.printRate(getRate);
    }
}

export default controller;