class CalcController {
    /** 
     * The constructor for the CalcController Class
    */
    constructor() {
        this._defaultAudio = new Audio('./assets/sounds/click.mp3');
        this._audioOnOff = false;
        this._lastOperator = '';
        this._lastNumber = '';
        this._operation = [];
        this._locale = 'pt-BR';
        this._currentDate;
        this._displayCalcEl = document.querySelector('#display');
        this._dateEl = document.querySelector('#data');
        this._timeEl = document.querySelector('#hora');
        this.initialize();
        this.initButtonEvents();
        this.initKeyboard();
    }

    /** 
     * Method to copy the content in the display to the clipboard
    */
    copyToClipboard() {
        let input = document.createElement('input');
        input.value = this.displayCalc;
        document.body.appendChild(input);
        input.select();
        document.execCommand('Copy');
        input.remove();
    }

    /** 
     * Method to paste the current value in the clipboard to the calc display
    */
    pasteFromClipboard(){
        document.addEventListener('paste', e=>{
            let textCopied = e.clipboardData.getData('Text');
            this.displayCalc = parseFloat(textCopied);
        })
    }

    /** 
     * Method that initialize the class
    */
    initialize() {
        this.setDisplayDateTime()
        setInterval(() => {
            this.setDisplayDateTime()
        }, 1000);   
        this.pasteFromClipboard();
        
        document.querySelectorAll('.btn-ac').forEach(btn=>{
            btn.addEventListener('dblclick', e=>{
                this.toggleAudio();
            })
        })
    }

    /** 
     * Method to enable the audio funcion
    */
    toggleAudio(){
        this._audioOnOff = !this._audioOnOff;
    }

    /** 
     * Method to play the audio
    */
    playAudio(){
        if(this._audioOnOff){
            this._defaultAudio.currentTime = 0;
            this._defaultAudio.play();
        }
    }

    /** 
     * Methot that initialize the keyboard events
    */
    initKeyboard() {
        document.addEventListener('keyup', e => {
            this.playAudio();
            switch (e.key) {
                case 'Escape':
                    this.clearAll();
                    break;

                case 'Backspace':
                    this.clearEntry();
                    break;

                case '+':
                case '-':
                case '*':
                case '/':
                case '%':
                    this.addOperation(e.key);
                    break;

                case 'Enter':
                case '=':
                    this.calc();
                    break;

                case '.':
                case ',':
                    this.addDot();

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
                    this.addOperation(parseInt(e.key));
                    break;

                case 'c':
                    if (e.ctrlKey) this.copyToClipboard()
                    break;
            }
        });
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
        this._lastNumber = '';
        this._lastOperator = '';
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
        if (isNaN(this.getLastOperation())) {

            if (this.isOperator(value)) {
                this.setLastOperation(value);
            } else {
                this.pushOperation(value);
                this.setLastNumberToDisplay();
            }

        } else {
            if (this.isOperator(value)) {
                this.pushOperation(value);
            } else {
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(newValue);
                this.setLastNumberToDisplay();
            }
        }
    }

    /** 
     * Method to set the current number in the calc display
    */
    setLastNumberToDisplay() {
        let lastNumber = this.getLastItem(false);
        if (!lastNumber) lastNumber = 0;
        this.displayCalc = lastNumber;
    }

    /**
     * Method to return the last item from this._operation
     * @param {Boolean} isOperator 
     */
    getLastItem(isOperator = true) {
        let lastItem;
        for (let i = this._operation.length - 1; i >= 0; i--) {
            if (this.isOperator(this._operation[i]) == isOperator) {
                lastItem = this._operation[i];
                break;
            }
        }
        if (!lastItem) {
            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
        }
        return lastItem;
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
     * Method to return the current result
    */
    getResult() {
        return eval(this._operation.join(''));
    }

    /** 
     * Main Method for make the operations happen
    */
    calc() {
        let currentLast = '';
        this._lastOperator = this.getLastItem();

        if (this._operation.length < 3) {
            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber]
        }

        if (this._operation.length > 3) {
            currentLast = this._operation.pop();
            this._lastNumber = this.getResult();
        } else if (this._operation.length == 3) {
            this._lastNumber = this.getLastItem(false);
        }

        let currentResult = this.getResult();
        if (currentLast == '%') {
            currentResult /= 100;
            this._operation = [currentLast]
        } else {
            this._operation = [currentResult];
            if (currentLast) this._operation.push(currentLast);
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
     * Method to add the dot to the number
    */
    addDot() {
        let lastOperation = this.getLastOperation();
        if (typeof lastOperation === 'string' && lastOperation.indexOf('.') > -1) return;

        if (this.isOperator(lastOperation) || !lastOperation) {
            this.pushOperation('0.');
        } else {
            this.setLastNumberToDisplay(lastOperation.toString() + '.');
        }
        this.setLastNumberToDisplay();
    }

    /**
     * Core of the buttons functions
     * @param {String} value String that will be used to switch between the operations
     */
    execBtn(value) {
        this.playAudio();
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
                this.addDot();

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
        if(displayCalc.toString().length > 10 ){
            this.setError();
            return false;
        }
        this._displayCalcEl.innerHTML = displayCalc;
    }
    get currentDate() {
        return new Date();
    }
}