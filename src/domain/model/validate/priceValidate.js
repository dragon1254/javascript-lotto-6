import error from "../constant/error";

class validatePrice{
    buyPrice(priceNumber){
        if(isNaN(priceNumber)){
            throw new Error(error.string);
        }
        if(!Number.isInteger(priceNumber)){
            throw new Error(error.integer);
        }
        if(priceNumber % 1000 !== 0){
            throw new Error(error.thousand);
        }
        if(priceNumber < 1000){
            throw new Error(error.lowPrice);
        }
    }
}

export default validatePrice;