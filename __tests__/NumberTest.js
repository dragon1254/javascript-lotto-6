import bonusValidate from "../src/domain/model/validate/bonusValidate.js";

describe("번호 테스트", () => {
  test("당첨번호와 보너스 번호가 중복이면 예외가 발생한다.", () => {
    expect(() => {
      const bonusChcek = new bonusValidate()
      bonusChcek.checkBonus(6,[1,2,3,4,5,6])
    }).toThrow("[ERROR]");
  });
  test("보너스 번호가 문자이면 예외가 발생한다.", () => {
    expect(() => {
        const bonusChcek = new bonusValidate()
        bonusChcek.checkBonus('a',[1,2,3,4,5,6])
    }).toThrow("[ERROR]");
  });
  test("보너스 번호가 정수가 아니면 예외가 발생한다.", () => {
    expect(() => {
        const bonusChcek = new bonusValidate()
        bonusChcek.checkBonus(4.5,[1,2,3,4,5,6])
    }).toThrow("[ERROR]");
  });
  test("보너스 번호가 1보다 작으면 예외가 발생한다.", () => {
    expect(() => {
        const bonusChcek = new bonusValidate()
        bonusChcek.checkBonus(0, [1,2,3,4,5,6])
    }).toThrow("[ERROR]");
  });
  test("보너스 번호가 45보다 크면 예외가 발생한다.", () => {
    expect(() => {
        const bonusChcek = new bonusValidate()
        bonusChcek.checkBonus(46, [1,2,3,4,5,6])
    }).toThrow("[ERROR]");
  });
 
});
