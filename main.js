// Objects

const calcExpression = {
    visorValue: "0",
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
    "=": (firstOperand, visorValue) =>  {return visorValue},
    "sqrt": (firstOperand, visorValue) => {return Math.round(Math.sqrt(visorValue) *100)/100} ,
    "%": (firstOperand, visorValue) => {return visorValue/100},
};

//Variables

    // Numbers 

const calcButtons = document.querySelector('.calculator__buttons');

    //Erase 

const btnErase = document.querySelector(".button__erase");


    // Visor 

const visorOut = document.querySelector(".visor__output");
const visorInp = document.querySelector(".visor__input");


//Functions

function visorInpUpdate() {
    visorInp.textContent = calcExpression.visorValue
}

function eraseVisor() {
    calcExpression.visorValue = "0";
    calcExpression.operator = null;
    calcExpression.firstOperand= null;
    calcExpression.waitForSecondOperand = false;
    visorInp.textContent = calcExpression.visorValue;
    return;
}

function inputDigit(digit) {
    const {visorValue, waitForSecondOperand }  = calcExpression;
    if (waitForSecondOperand === true) {
        calcExpression.visorValue = digit;
        calcExpression.waitForSecondOperand = false;
        return;
    }
    calcExpression.visorValue = visorValue === "0" ? digit : visorValue + digit
}

function insertFloat(dot) {
    if (calcExpression.waitForSecondOperand === true) return;
    if (!calcExpression.visorValue.includes(dot)) {
        calcExpression.visorValue += dot;
    }
}

function operate(selectedOperator) {
    const { firstOperand, operator, visorValue} = calcExpression;
    let inputedValue = parseFloat(visorValue);

    if (operator && calcExpression.waitForSecondOperand)  {
        if (selectedOperator === "sqrt" || selectedOperator === "%") {
            let result = executeOperation[selectedOperator](firstOperand, inputedValue);
            if ((calcExpression.visorValue < 0 || firstOperand < 0) && selectedOperator === "sqrt"){
                calcExpression.visorValue = "Error";
                calcExpression.waitForSecondOperand = true;
                calcExpression.firstOperand = null;
                calcExpression.operator = null;
                return;
            }
            calcExpression.visorValue = result;
            calcExpression.firstOperand = result;
            visorOut.textContent = inputedValue + selectedOperator;
            calcExpression.waitForSecondOperand = true;
            return;
        }
        calcExpression.operator = selectedOperator;
        visorOut.textContent = firstOperand + selectedOperator;
        return
    }

    if (firstOperand === null) {
        if (selectedOperator === "%" || selectedOperator === "sqrt") {
            if (inputedValue < 0 || firstOperand < 0){
                calcExpression.visorValue = "Error";
                return;
            }
            let result = Math.round(executeOperation[selectedOperator](firstOperand, inputedValue) * 100)/100;
            calcExpression.visorValue = result;
            calcExpression.firstOperand = result;
            visorOut.textContent = inputedValue + selectedOperator;
            calcExpression.waitForSecondOperand = true;
            calcExpression.operator = selectedOperator;
            return;
        }
        calcExpression.firstOperand = inputedValue;
        visorOut.textContent = inputedValue + selectedOperator;
    }

    if (firstOperand !== null) {
        let result = Math.round(executeOperation[operator](firstOperand, inputedValue) * 100)/100;

        if (operator !== "=") {
            visorOut.textContent = firstOperand + operator + inputedValue + "=";
        } else {
            visorOut.textContent = visorValue + "="
        }
        calcExpression.firstOperand = result;
        calcExpression.visorValue = result;
    }

    calcExpression.waitForSecondOperand = true;
    calcExpression.operator = selectedOperator;

}

function backSpace(){
    const {visorValue} = calcExpression
    visorValue.value = visorValue.value.slice(0, - 1);
}

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
        eraseVisor();
        return
    }

    if (target.classList.contains('button__number')) {
        inputDigit(target.value);
        visorInpUpdate()
        return
    }
});


// calcButtons.addEventListener('click', (e) =>{
//     const { target } = e;
//     if (!target.matches('button'))
//         return;
//
//     if (target.classList.contains('button__operator')) {
//         operate(target.value);
//         visorInpUpdate();
//         console.log(calcExpression);
//         return
//     }
//
//     if (target.classList.contains('button__float')) {
//         insertFloat(target.value);
//         visorInpUpdate();
//         return
//     }
//
//     if (target.classList.contains('button__erase')) {
//         console.log('erase', target.value);
//         eraseVisor();
//         return
//     }
//
//     if (target.classList.contains('button__number')) {
//         inputDigit(target.value);
//         visorInpUpdate()
//         return
//     }
// });
