class CalcController{
    constructor(){
        this._displayCalc = '0';
        this._currentDate;
    }

    get displayCalc(){
        return this._displayCalc;
    }
    set displayCalc(displayCalc){
        this._displayCalc = displayCalc;
    }
    get currentDate(){
        return this._currentDate;
    }
    set currentDate(currentDate){
        this._currentDate = currentDate;
    }
}