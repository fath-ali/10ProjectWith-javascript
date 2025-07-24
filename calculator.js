class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.shouldResetScreen = false;
    }

    delete() {
        if (this.shouldResetScreen) return;
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (this.shouldResetScreen) {
            this.currentOperand = '';
            this.shouldResetScreen = false;
        }
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    alert('Cannot divide by zero!');
                    return;
                }
                computation = prev / current;
                break;
            case '%':
                computation = prev % current;
                break;
            default:
                return;
        }
        
        // Round to prevent floating point errors
        computation = Math.round((computation + Number.EPSILON) * 100000000) / 100000000;
        
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
        this.shouldResetScreen = true;
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

// Initialize calculator
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-clear]');
const decimalButton = document.querySelector('[data-decimal]');
const previousOperandTextElement = document.querySelector('#previousOperand');
const currentOperandTextElement = document.querySelector('#currentOperand');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// Event listeners for buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

decimalButton.addEventListener('click', () => {
    calculator.appendNumber('.');
    calculator.updateDisplay();
});

// Keyboard support
document.addEventListener('keydown', (event) => {
    // Numbers
    if (event.key >= '0' && event.key <= '9') {
        calculator.appendNumber(event.key);
        calculator.updateDisplay();
    }
    
    // Operations
    if (event.key === '+') {
        calculator.chooseOperation('+');
        calculator.updateDisplay();
    }
    
    if (event.key === '-') {
        calculator.chooseOperation('-');
        calculator.updateDisplay();
    }
    
    if (event.key === '*') {
        calculator.chooseOperation('×');
        calculator.updateDisplay();
    }
    
    if (event.key === '/') {
        event.preventDefault(); // Prevent browser search
        calculator.chooseOperation('÷');
        calculator.updateDisplay();
    }
    
    if (event.key === '%') {
        calculator.chooseOperation('%');
        calculator.updateDisplay();
    }
    
    // Decimal point
    if (event.key === '.' || event.key === ',') {
        calculator.appendNumber('.');
        calculator.updateDisplay();
    }
    
    // Equals
    if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault();
        calculator.compute();
        calculator.updateDisplay();
    }
    
    // Delete
    if (event.key === 'Backspace') {
        calculator.delete();
        calculator.updateDisplay();
    }
    
    // Clear
    if (event.key === 'Escape' || event.key.toLowerCase() === 'c') {
        calculator.clear();
        calculator.updateDisplay();
    }
});

// Initialize display
calculator.updateDisplay();