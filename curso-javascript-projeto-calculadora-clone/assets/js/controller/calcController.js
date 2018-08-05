class CalcController {
    /** 
     * The constructor for the CalcController Class
    */
    constructor() {
        this._operation = [];
        this._locale = 'pt-BR';
        this._currentDate;
        this._displayCalcEl = document.querySelector('#display');
        this._dateEl = document.querySelector('#data');
        this._timeEl = document.querySelector('#hora');
        this.initialize();
        this.initButtonEvents();
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
     * 
     * @param {HTMLElement} element element in the DOM that will added the function
     * @param {String} events string with all the events that need the execute the same function
     * @param {Function} fn function that will be executed at the element at all events listed 
     */
    addEventListenerAll(element, events, fn) {
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn);
        })
    }

    /** 
     * Method that clear all the calc
    */
    clearAll() {
        this._operation = [];
        this.setLastNumberToDisplay();
    }

    /** 
     * Method that clear the last entry
    */
    clearEntry() {
        this._operation.pop();
        this.setLastNumberToDisplay();
    }


    /** 
     * Method that add a new operation
    */
    addOperation(value) {
        console.log(this._operation);
        if (isNaN(this.getLastOperation())) {

            if (this.isOperator(value)) {
                this.setLastOperation(value);
            } else if (isNaN(value)) {

            } else {
                this.pushOperation(value);
                this.setLastNumberToDisplay();
            }

        } else {
            if (this.isOperator(value)) {
                this.pushOperation(value);
            } else {
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));
                this.setLastNumberToDisplay();
            }
        }
    }

    /** 
     * Method to set the current number in the calc display
    */
    setLastNumberToDisplay() {
        let lastNumber;
        for (let i = this._operation.length - 1; i >= 0; i--) {
            if (!this.isOperator(this._operation[i])) {
                lastNumber = this._operation[i];
                break;
            }
        }
        if (!lastNumber) lastNumber = 0;
        this.displayCalc = lastNumber;
    }

    /**
     * Method to increase the main array
     * @param {String} value value that will be pushed to the main Array 
     */
    pushOperation(value) {
        this._operation.push(value);
        if (this._operation.length > 3) {
            this.calc();
        }
    }

    /** 
     * Main Method for make the operations happen
    */
    calc() {
        let currentLast = '';
        if (this._operation.length > 3) {
            currentLast = this._operation.pop();
        }

        let currentResult = eval(this._operation.join(''));
        if (currentLast == '%') {
            currentResult /= 100;
            this._operation = [currentLast]
        } else {
            this._operation = [currentResult];
            if(currentLast) this._operation.push(currentLast);
        }
        this.setLastNumberToDisplay();
    }
    /** 
     * Method that returns the last value in the Array
    */
    getLastOperation() {
        return this._operation[this._operation.length - 1];
    }

    /**
     * 
     * @param {String} value value that will be used to update the last position in the array 
     */
    setLastOperation(value) {
        this._operation[this._operation.length - 1] = value;
    }

    /**
     * 
     * @param {String} value value to check if the current input isNaN 
     */
    isOperator(value) {
        return ['+', '-', '*', '%', '/'].indexOf(value) > -1;
    }

    /** 
     * Default error message
    */
    setError() {
        this.displayCalc = 'Error';
    }

    /**
     * Core of the buttons functions
     * @param {String} value String that will be used to switch between the operations
     */
    execBtn(value) {
        switch (value) {
            case 'ac':
                this.clearAll();
                break;

            case 'ce':
                this.clearEntry();
                break;

            case 'soma':
                this.addOperation('+');

                break;
            case 'subtracao':
                this.addOperation('-');

                break;
            case 'divisao':
                this.addOperation('/');

                break;
            case 'multiplicacao':
                this.addOperation('*');

                break;
            case 'porcento':
                this.addOperation('%');

                break;
            case 'ponto':
                this.addOperation('.');

                break;
            case 'igual':
                this.calc();
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;
            default:
                this.setError();
                break;
        }
    }
    /** 
     * Method to initialize all the events in the calculator
    */
    initButtonEvents() {
        let allButtons = document.querySelectorAll('#buttons > g, #parts > g');
        Array.from(allButtons).forEach((btn, index) => {
            this.addEventListenerAll(btn, 'click drag', e => {
                let textBtn = btn.className.baseVal.replace('btn-', '');
                this.execBtn(textBtn);
            });

            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e => {
                btn.style.cursor = 'pointer';
            });
        })
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