// Objects

const calcExpression = {
    visorValue: 0,
    firstOperand: null,
    operator: null,
    waitForSecondOperand: false,
};

const executeOperation = {
    "+": (firstOperand, visorValue) =>  { return firstOperand + visorValue},
    "-": (firstOperand, visorValue) =>  { return firstOperand - visorValue},
    "*": (firstOperand, visorValue) =>  { return firstOperand * visorValue},
    "/": (firstOperand, visorValue) =>  { return firstOperand / visorValue},
    "**": (firstOperand, visorValue) =>  { return firstOperand ** visorValue},
    "=": (firstOperand) =>  {return firstOperand},
};


//Variables

    // Numbers 

const calcButtons = document.querySelector('.calculator__buttons');

    //Erase 

const btnErase = document.querySelector(".button__erase");

    //Float & Parenthesis 

    // Visor 

const visorOut = document.querySelector(".visor__output");
const visorInp = document.querySelector(".visor__input");

    // Booleans


//Functions

function visorInpUpdate() {
    visorInp.textContent = calcExpression.visorValue
}

function inputDigit(digit) {
    const {visorValue, waitForSecondOperand }  = calcExpression;
    if (waitForSecondOperand === true) {
        calcExpression.visorValue = digit;
        calcExpression.waitForSecondOperand = false;
        return;
    }
    calcExpression.visorValue = visorValue === 0 ? digit : visorValue + digit
}

function insertFloat(dot) {
    if (!calcExpression.visorValue.includes(dot)) {
        calcExpression.visorValue += dot;
    }
}

function operate(selectedOperator) {
    const { firstOperand, operator, visorValue} = calcExpression;
    let inputedValue = parseFloat(visorValue);

    if (operator && calcExpression.waitForSecondOperand) {
        calcExpression.operator = selectedOperator;
        visorOut.textContent = firstOperand + selectedOperator;
        return
    }

    if (firstOperand === null) {
        calcExpression.firstOperand = inputedValue;
        visorOut.textContent = inputedValue + selectedOperator;
    }

    if (firstOperand !== null) {

        let result = executeOperation[operator](firstOperand, inputedValue);
        visorOut.textContent = firstOperand + operator + inputedValue + " =";

        if (operator === "=") {
            calcExpression.firstOperand = inputedValue;
            visorOut.textContent = `${inputedValue}  =`;
            calcExpression.waitForSecondOperand = true;
        }

        calcExpression.firstOperand = result;
        calcExpression.visorValue = result;
    }

    calcExpression.waitForSecondOperand = true;
    calcExpression.operator = selectedOperator;
}

    // Functions --- Operations

//EventListeners + Execution

visorInpUpdate(); // Set initial visor value to 0.


calcButtons.addEventListener('click', (e) =>{
    const { target } = e;
    if (!target.matches('button'))
        return;

    if (target.classList.contains('button__operator')) {
        operate(target.value);
        visorInpUpdate();
        console.log(calcExpression);
        return
    }

    if (target.classList.contains('button__float')) {
        insertFloat(target.value);
        visorInpUpdate();
        return
    }

    if (target.classList.contains('button__erase')) {
        console.log('erase', target.value);
        return
    }

    if (target.classList.contains('button__number')) {
        inputDigit(target.value);
        visorInpUpdate()
        return
    }
});


// console.log(Math.sqrt(4))


//Execution