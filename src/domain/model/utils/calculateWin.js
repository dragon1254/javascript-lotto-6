class calculateWin{
    constructor(myLotto, winningNumber, bonusNumber){
        this.myLotto = myLotto;
        this.winningNumber = winningNumber;
        this.bonusNumber = bonusNumber;
    }

    winCount(){
/* 내 로또가 현재 로또 배열의 배열로 되어 있으므로 
1개씩 꺼내서 this.winningNumber랑 this.bonusNumber랑 비교 해서 
key가 3, 4, 5, 보너스, 6 의 객체로 만듦*/
        const winObject = {'three' : 0, 'four': 0, 'five': 0,'bonus': 0,'six': 0};
        this.myLotto.forEach(element => {
            let duplication = element.filter(it => this.winningNumber.includes(it))
            let count = duplication.length;
            this.caseCheck(count,winObject);
        });
        return winObject;
    }
    // depth가 너무 깊어져서 switch case만 담당하는 메서드 따로 만듦
    caseCheck(count,winObject){
        switch (count) {
            case 3 : winObject['three']++
            break;
            case 4 : winObject['four']++
            break;
            case 5 : 
            if(element.include(this.bonusNumber)){
                winObject['bonus']++
            } else if(!element.include(this.bonusNumber)){
                winObject['five']++
            }
            break;
            case 6 : winObject['six']++
            break;
        }
    }
}

export default calculateWin;