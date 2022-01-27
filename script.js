//class to add all functions to calculator
class Calculator{
    //starts the calculator and clears all previous operations
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
//functions
    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        if (this.currentOperand === '') return
        if (this.previousOperand !== '' ){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation){
            case '+':
                computation = prev + current
                break
            
            case '-':
                computation = prev - current
                break
            
            case '*':
                computation = prev * current
                break

            case '÷':
                computation = prev / current
                break

            case '%':
                computation = prev*0.01 * current
                break

            case '^':
                computation = prev ** current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand
        if(this.operation != null){
            this.previousOperandTextElement.innerText = 
                `${this.previousOperand} ${this.operation}`
        }
        else{
            this.previousOperandTextElement.innerText = ''
        }
       
    }
}
//import from data- from html 
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const deleteButton = document.querySelector('[data-delete]')
const equalsButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-all-clear]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
// adds number to the display
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
//adds the operation
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})
//calls compute function after equals is clicked
equalsButton.addEventListener('click', button =>{
    calculator.compute()
    calculator.updateDisplay()
})
//clears the display
allClearButton.addEventListener('click', button =>{
    calculator.clear()
    calculator.updateDisplay()
})
//deletes the last number typed
deleteButton.addEventListener('click', button =>{
    calculator.delete()
    calculator.updateDisplay()
})