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
     * Method to initialize all the events in the calculator
    */
    initButtonEvents() {
        let allButtons = document.querySelectorAll('#buttons > g, #parts > g');
        Array.from(allButtons).forEach((btn, index) => {
            this.addEventListenerAll(btn, 'click drag', e => {
                console.log(btn.className.baseVal.replace('btn-', ''));
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