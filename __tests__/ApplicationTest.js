import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";


const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickUniqueNumbersInRange = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickUniqueNumbersInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

const runException = async (input) => {
  // given
  const logSpy = getLogSpy();

  const RANDOM_NUMBERS_TO_END = [1,2,3,4,5,6];
  const INPUT_NUMBERS_TO_END = ["1000", "1,2,3,4,5,6", "7"];

  mockRandoms([RANDOM_NUMBERS_TO_END]);
  mockQuestions([input, ...INPUT_NUMBERS_TO_END]);

  // when
  const app = new App();
  await app.play();

  // then
  expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("[ERROR]"));
}

describe("로또 기능 테스트", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  })

  test("3개 일치 여부시 잘 출력 되는지", async () => {
    // given
    const logSpy = getLogSpy();

    mockRandoms([
      [8, 21, 23, 41, 42, 43],
      [3, 5, 11, 16, 32, 38],
      [7, 11, 16, 35, 36, 44],
      [1, 8, 11, 31, 41, 42],
      [13, 14, 16, 38, 42, 45],
      [7, 11, 30, 40, 42, 43],
      [2, 13, 22, 32, 38, 45],
      [1, 3, 5, 14, 22, 45],
    ]);
    mockQuestions(["8000", "1,2,3,4,5,6", "7"]);

    // when
    const app = new App();
    await app.play();

    // then
    const logs = [
      "8개를 구매했습니다.",
      "[8, 21, 23, 41, 42, 43]",
      "[3, 5, 11, 16, 32, 38]",
      "[7, 11, 16, 35, 36, 44]",
      "[1, 8, 11, 31, 41, 42]",
      "[13, 14, 16, 38, 42, 45]",
      "[7, 11, 30, 40, 42, 43]",
      "[2, 13, 22, 32, 38, 45]",
      "[1, 3, 5, 14, 22, 45]",
      "3개 일치 (5,000원) - 1개",
      "4개 일치 (50,000원) - 0개",
      "5개 일치 (1,500,000원) - 0개",
      "5개 일치, 보너스 볼 일치 (30,000,000원) - 0개",
      "6개 일치 (2,000,000,000원) - 0개",
      "총 수익률은 62.5%입니다.",
    ];

    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

  test("4개 일치 여부시 잘 출력 되는지", async () => {
    // given
    const logSpy = getLogSpy();

    mockRandoms([
      [15, 17, 32, 39, 43, 44],
      [7, 11, 16, 35, 36, 44],
      [8, 11, 13, 19, 30, 31],
      [13, 14, 16, 38, 42, 45],
      [7, 11, 30, 40, 42, 43],
      [2, 13, 22, 32, 38, 45],
      [3, 10, 19, 24, 32, 34]]);
    mockQuestions(["7000", "8, 11, 13, 19, 43, 44", "45"]);

    // when
    const app = new App();
    await app.play();

    // then
    const logs = [
      "7개를 구매했습니다.",
      "[15, 17, 32, 39, 43, 44]",
      "[7, 11, 16, 35, 36, 44]",
      "[8, 11, 13, 19, 30, 31]",
      "[13, 14, 16, 38, 42, 45]",
      "[7, 11, 30, 40, 42, 43]",
      "[2, 13, 22, 32, 38, 45]",
      "[3, 10, 19, 24, 32, 34]",
      "3개 일치 (5,000원) - 0개",
      "4개 일치 (50,000원) - 1개",
      "5개 일치 (1,500,000원) - 0개",
      "5개 일치, 보너스 볼 일치 (30,000,000원) - 0개",
      "6개 일치 (2,000,000,000원) - 0개",
      "총 수익률은 714.3%입니다.",
    ];

    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

  test("5개 일치 여부시 잘 출력 되는지", async () => {
    // given
    const logSpy = getLogSpy();

    mockRandoms([
      [15, 17, 32, 39, 43, 44],
      [7, 11, 16, 35, 36, 44],
      [8, 11, 13, 19, 30, 31],
      [13, 14, 16, 38, 42, 45],
      [7, 11, 30, 40, 42, 43],
      [2, 13, 22, 32, 38, 45],
      [3, 10, 19, 24, 32, 34]]);
    mockQuestions(["7000", "8, 11, 13, 19, 30, 44", "45"]);

    // when
    const app = new App();
    await app.play();

    // then
    const logs = [
      "7개를 구매했습니다.",
      "[15, 17, 32, 39, 43, 44]",
      "[7, 11, 16, 35, 36, 44]",
      "[8, 11, 13, 19, 30, 31]",
      "[13, 14, 16, 38, 42, 45]",
      "[7, 11, 30, 40, 42, 43]",
      "[2, 13, 22, 32, 38, 45]",
      "[3, 10, 19, 24, 32, 34]",
      "3개 일치 (5,000원) - 0개",
      "4개 일치 (50,000원) - 0개",
      "5개 일치 (1,500,000원) - 1개",
      "5개 일치, 보너스 볼 일치 (30,000,000원) - 0개",
      "6개 일치 (2,000,000,000원) - 0개",
      "총 수익률은 21428.6%입니다.",
    ];

    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });
  
  test("5개와 보너스 일치 여부시 잘 출력 되는지", async () => {
    // given
    const logSpy = getLogSpy();

    mockRandoms([
      [15, 17, 32, 39, 43, 44],
      [7, 11, 16, 35, 36, 44],
      [8, 11, 13, 19, 30, 31],
      [13, 14, 16, 38, 42, 45],
      [7, 11, 30, 40, 42, 43],
      [2, 13, 22, 32, 38, 45],
      [3, 10, 19, 24, 32, 34]]);
    mockQuestions(["7000", "8, 11, 13, 19, 30, 44", "31"]);

    // when
    const app = new App();
    await app.play();

    // then
    const logs = [
      "7개를 구매했습니다.",
      "[15, 17, 32, 39, 43, 44]",
      "[7, 11, 16, 35, 36, 44]",
      "[8, 11, 13, 19, 30, 31]",
      "[13, 14, 16, 38, 42, 45]",
      "[7, 11, 30, 40, 42, 43]",
      "[2, 13, 22, 32, 38, 45]",
      "[3, 10, 19, 24, 32, 34]",
      "3개 일치 (5,000원) - 0개",
      "4개 일치 (50,000원) - 0개",
      "5개 일치 (1,500,000원) - 0개",
      "5개 일치, 보너스 볼 일치 (30,000,000원) - 1개",
      "6개 일치 (2,000,000,000원) - 0개",
      "총 수익률은 428571.4%입니다.",
    ];

    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });
  
  test("6개 일치 여부시 잘 출력 되는지", async () => {
    // given
    const logSpy = getLogSpy();

    mockRandoms([
      [15, 17, 32, 39, 43, 44],
      [7, 11, 16, 35, 36, 44],
      [8, 11, 13, 19, 30, 31],
      [13, 14, 16, 38, 42, 45],
      [7, 11, 30, 40, 42, 43],
      [2, 13, 22, 32, 38, 45],
      [3, 10, 19, 24, 32, 34]]);
    mockQuestions(["7000", "8, 11, 13, 19, 30, 31", "45"]);

    // when
    const app = new App();
    await app.play();

    // then
    const logs = [
      "7개를 구매했습니다.",
      "[15, 17, 32, 39, 43, 44]",
      "[7, 11, 16, 35, 36, 44]",
      "[8, 11, 13, 19, 30, 31]",
      "[13, 14, 16, 38, 42, 45]",
      "[7, 11, 30, 40, 42, 43]",
      "[2, 13, 22, 32, 38, 45]",
      "[3, 10, 19, 24, 32, 34]",
      "3개 일치 (5,000원) - 0개",
      "4개 일치 (50,000원) - 0개",
      "5개 일치 (1,500,000원) - 0개",
      "5개 일치, 보너스 볼 일치 (30,000,000원) - 0개",
      "6개 일치 (2,000,000,000원) - 1개",
      "총 수익률은 28571428.6%입니다.",
    ];

    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });
});



describe("예외 테스트", () => {
  test("사는 금액에 문자있을 때 [ERROR] 출력", async () => {
    await runException("1000j");
  });
  
  test("사는 금액이 정수가 아닐때 [ERROR] 출력", async () => {
    await runException("1000.5");
  });

  test("사는 금액이 1000원 단위가 아닐 때 [ERROR] 출력", async () => {
    await runException("2500");
  });

  test("사는 금액이 1000원 이하일 때 [ERROR] 출력", async () => {
    await runException("500");
  });
});

