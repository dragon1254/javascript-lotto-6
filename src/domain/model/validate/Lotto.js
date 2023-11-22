import error from "../constant/error";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error(error.winningSix);
    }
    const duplication = new Set(numbers);
    if (numbers.length !== duplication.size){
      throw new Error(error.duplication);
    }
    numbers.forEach(element => {
      if (isNaN(element)) {
        throw new Error(error.string);
      }
      if (!Number.isInteger(element)) {
        throw new Error(error.range);
      }
      if (element < 1) {
        throw new Error(error.range);
      }
      if (element > 45) {
        throw new Error(error.range);
      }
    });
  }
}

export default Lotto;
