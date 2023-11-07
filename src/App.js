import { MissionUtils } from "@woowacourse/mission-utils";
import { MESSAGE } from "./const/message";
import { ERROR } from "./const/error";
import Lotto from "./Lotto";
import checkBonus from "./Bonus";


class App {

  constructor() {
    this.price = 0;
    this.sameNumbersObject = {
      'three' : 0,
      'four' : 0,
      'five' : 0,
      'six' : 0,
      'bonus' : 0
    }
    this.winning = [];
    this.bonus = 0;
    this.count = 0;
    this.arrayNumbers = [];
  }

  async play() {
    await this.getLottoPrice();
    await this.getMyLottos();
    this.printHowMany();
    await this.getNumbers();
    this.getWinningLottos();
    this.printWinningStatics();
  }

  async getLottoPrice() {
    const priceInput = await MissionUtils.Console.readLineAsync(MESSAGE.BUY);
    this.count = this.checkPrice(priceInput);
  }

  checkPrice(priceInput) {
    const checkPrice = Number(priceInput);
    const remainder = checkPrice % 1000;
    const share = parseInt(checkPrice/1000)

    this.checkNaN(checkPrice);
    this.checkThousand(remainder);

    this.price = checkPrice;
    return share;
  }

  checkNaN(checkPrice){
    try {
      if(isNaN(checkPrice)) {
         throw new Error;
      }
    } catch (err){
      MissionUtils.Console.print(ERROR.NAN);
      this.getMyLottos();
    };
  }

  checkThousand(remainder){
    try {
      if(remainder !== 0 ) {
        throw new Error;
      }
    } catch (err){
      MissionUtils.Console.print(ERROR.THOUSAND);
      this.getMyLottos();
    }
  }

  async getMyLottos() {
    for(let i = 0; i < this.count; i++){
      const takeNumber = await MissionUtils.Random.pickUniqueNumbersInRange(1,45,6);
      const lottoNumber = takeNumber.sort((b,a)=>{return b-a});
      this.arrayNumbers.push(lottoNumber);
    }
  }

  printHowMany() {
    MissionUtils.Console.print(`${this.count}개를 구매했습니다.`);
    for(let i = 0; i < this.count; i++){
      MissionUtils.Console.print(`[${this.arrayNumbers[i].join(', ')}]`);
    }
  }
  
  async getNumbers(){
    const winningNumbers = await MissionUtils.Console.readLineAsync(MESSAGE.WINNING_NUMBER);
    const bonusNumbers = await MissionUtils.Console.readLineAsync(MESSAGE.BONUS_NUMBER);
    
    this.bonus = Number(bonusNumbers);
    this.winning = winningNumbers.split(",").map(Number);
    const numbers = [...this.winning,this.bonus]
    
    const checkNumbers = new Lotto(this.winning);    
    const checkbonus = new checkBonus(numbers);
  } 

  getWinningLottos() {
    for(let i = 0; i < this.count; i++){
      const temporaryArray = this.arrayNumbers[i].map(Number)
      const newArray = [...temporaryArray,...this.winning.map(Number)]
      const setObject = new Set(newArray)
      const set = Array.from(setObject);

      switch (set.length) {
        case 9:
          this.sameNumbersObject['three']++
          break;
        case 8:
          this.sameNumbersObject['four']++
          break;
        case 7:
          this.sameNumbersObject['five']++
          break;
        case 6:
          this.sameNumbersObject['six']++
          break;      
      }
      if(set.length === 7 && this.arrayNumbers[i].includes(this.bonus)) {
        this.sameNumbersObject['bonus']++
      }
    }
  }
  
  printWinningStatics() {
    let winningPrice = 
    this.sameNumbersObject['three'] * 5000 
    + this.sameNumbersObject['four']* 50000
    + this.sameNumbersObject['five'] * 1500000
    + this.sameNumbersObject['bonus'] * 30000000 
    + this.sameNumbersObject['six'] * 2000000000;

    const rate = winningPrice/this.price *100;
    const percent = rate.toFixed(1);
    
    MissionUtils.Console.print(
    `당첨 통계
    ---
    3개 일치 (5,000원) - ${this.sameNumbersObject['three']}개
    4개 일치 (50,000원) - ${this.sameNumbersObject['four']}개
    5개 일치 (1,500,000원) - ${this.sameNumbersObject['five']}개
    5개 일치, 보너스 볼 일치 (30,000,000원) - ${this.sameNumbersObject['bonus']}개
    6개 일치 (2,000,000,000원) - ${this.sameNumbersObject['six']}개
    총 수익률은 ${percent}%입니다.`)
  }
  
}

export default App;
