import number from "../constant/number";

class calculateRate{
    constructor(price){
        this.price = price;
    }
    makeRate(winCountNumber){
        const winCountNumberArray = Object.values(winCountNumber);
        let benefit = 0
        winCountNumberArray.forEach((element,index) => {
            benefit = benefit + element * number.winPrize[index];
        });
        const rate = benefit / this.price
        return rate;
    }
}
export default calculateRate;