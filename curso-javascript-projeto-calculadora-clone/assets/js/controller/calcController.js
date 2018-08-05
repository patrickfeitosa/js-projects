class CalcController {
    /** 
     * The constructor for the CalcController Class
    */
    constructor() {
        this._locale = 'pt-BR';
        this._currentDate;
        this._displayCalcEl = document.querySelector('#display');
        this._dateEl = document.querySelector('#data');
        this._timeEl = document.querySelector('#hora');
        this.initialize();
    }

    /** 
     * Method that initialize the class
    */
    initialize() {
        this.setDisplayDateTime()
        setInterval(() => {
            this.setDisplayDateTime()
        }, 1000);
    }

    /** 
     * Method to update the Current Time and Date
    */
    setDisplayDateTime() {
        this.displayDate = this.currentDate.toLocaleDateString(this._locale)
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale)
    }

    /**
     * Getters and Setters for the Class
     */
    get displayDate() {
        return this._dateEl.innerHTML;
    }

    set displayDate(displayDate) {
        return this._dateEl.innerHTML = displayDate;
    }

    get displayTime() {
        return this._timeEl.innerHTML;
    }

    set displayTime(displayTime) {
        return this._timeEl.innerHTML = displayTime
    }
    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }
    set displayCalc(displayCalc) {
        this._displayCalcEl.innerHTML = displayCalc;
    }
    get currentDate() {
        return new Date();
    }
}