import inputView from "../../view/inputview";
import Lotto from "../validate/Lotto";
import bonusValidate from "../validate/bonusValidate";

class makeNumbers{
    async winningNumbers(){
        const getWinningNumber = await inputView.getWinning()
        const winningNumberArray = getWinningNumber.split(',').map(Number);    
        try{
            const checkLotto = new Lotto(winningNumberArray)
            return winningNumberArray;
        } catch(err) {
        console.log(err);
        return await this.winningNumbers()
        }
    }
    async bonusNumber(getWinningNumber){
        try {
            const getBonusNumber = await inputView.getBounus()
            const bonus = Number(getBonusNumber);
            const checkBonus = new bonusValidate();
            checkBonus.checkBonus(bonus, getWinningNumber);
            return bonus;
        } catch(err) {
            console.log(err)
            return await this.bonusNumber();
        }
    }
}

export default makeNumbers;