import error from "../constant/error";
import number from "../constant/number";

class validatePrice{
    buyPrice(priceNumber){
        if(isNaN(priceNumber)){
            throw new Error(error.string);
        }
        if(!Number.isInteger(priceNumber)){
            throw new Error(error.integer);
        }
        if(priceNumber % number.oneLottoPrice !== 0){
            throw new Error(error.thousand);
        }
        if(priceNumber < number.oneLottoPrice){
            throw new Error(error.lowPrice);
        }
    }
}

export default validatePrice;