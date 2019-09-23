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
    "^": (firstOperand, visorValue) =>  { return firstOperand ** visorValue},
    "=": (firstOperand, visorValue) =>  {return visorValue},
    "sqrt": (firstOperand, visorValue) => {return Math.round(Math.sqrt(visorValue) *100)/100} ,
    "%": (firstOperand, visorValue) => {return visorValue/100},
};

//Variables -------------------------------------------------------------------------------------

    // Numbers 

const calcButtons = document.querySelector('.calculator__buttons');

    // Visor 

const visorOut = document.querySelector(".visor__output");
const visorInp = document.querySelector(".visor__input");


//Functions -------------------------------------------------------------------------------------

function visorInpUpdate() {
    visorInp.textContent = calcExpression.visorValue
}

function eraseVisor() {
    calcExpression.visorValue = "0";
    calcExpression.operator = null;
    calcExpression.firstOperand= null;
    calcExpression.waitForSecondOperand = false;
    visorInpUpdate()
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
    if (calcExpression.waitForSecondOperand === true) {
        calcButtons.querySelector('.button__erase').textContent = "AC"; // prevents C button to appear while selecting "." after we got a result
        return;
    }
    if (!calcExpression.visorValue.includes(dot)) {
        calcExpression.visorValue += dot;
    }
}

function operate(selectedOperator) {
    const { firstOperand, operator, visorValue} = calcExpression;
    let inputedValue = parseFloat(visorValue);

    if (calcExpression.visorValue === "Error") {
        calcExpression.visorValue = inputedValue || "0";
        calcExpression.firstOperand = calcExpression.visorValue;
        calcExpression.operator = selectedOperator || null;
        return;
    }

    if (operator && calcExpression.waitForSecondOperand)  {
        if (selectedOperator === "sqrt" || selectedOperator === "%") {
            let result = executeOperation[selectedOperator](firstOperand, inputedValue);
            if ((calcExpression.visorValue < 0 || firstOperand < 0) && selectedOperator === "sqrt"){
                calcExpression.visorValue = "Error";
                visorOut.textContent = "";
                calcExpression.waitForSecondOperand = true;
                calcExpression.firstOperand = null;
                calcExpression.operator = null;
                return;
            }
            if (selectedOperator === "sqrt") {
                visorOut.textContent = "\u221A" + inputedValue + "=";
            } else {
                visorOut.textContent = inputedValue + selectedOperator + "=";
            }
            calcExpression.visorValue = result;
            calcExpression.firstOperand = result;
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
            if (selectedOperator === "sqrt") {
                visorOut.textContent = "\u221A" + inputedValue + "=";
            } else {
                visorOut.textContent = inputedValue + selectedOperator + "=";
            }
            calcExpression.waitForSecondOperand = true;
            calcExpression.operator = selectedOperator;
            return;
        }
        calcExpression.firstOperand = inputedValue;
        visorOut.textContent = inputedValue + selectedOperator;
    }

    if (firstOperand !== null) {
        let result = Math.round(executeOperation[operator](firstOperand, inputedValue) * 100)/100;

        if (operator !== "=" && operator !== "sqrt" && operator !== "%") {
            visorOut.textContent = firstOperand + operator + inputedValue + "=";
        } else if (operator !== "sqrt" && operator !== "%") {
            visorOut.textContent = visorValue + "="
        } else {
            visorOut.textContent = firstOperand + selectedOperator + inputedValue + "="
        }

        switch (selectedOperator) {
            case "sqrt":
                result = Math.round(executeOperation[selectedOperator](firstOperand, inputedValue) *100)/100;
                calcExpression.firstOperand = inputedValue;
                calcExpression.operator = null;
                visorOut.textContent = '\u221A' + visorValue + "=";
                break;
            case "%":
                result = executeOperation[selectedOperator](firstOperand, inputedValue);
                calcExpression.firstOperand = inputedValue;
                visorOut.textContent = visorValue + selectedOperator + "=";
                return;

        }
        if (operator === "sqrt" || operator === "%") {
            result = executeOperation[selectedOperator](firstOperand, inputedValue);
        }

        calcExpression.firstOperand = result;
        calcExpression.visorValue = result;
    }

    calcExpression.waitForSecondOperand = true;
    calcExpression.operator = selectedOperator;

}

function backSpace(){
    const {visorValue} = calcExpression;
    visorValue.toString();
    let tempArray = visorValue.split("");
    tempArray.pop();
    calcExpression.visorValue = tempArray.join("");
    visorInpUpdate();
    // }
}

//EventListeners --------------------------------------------------------------------------------

visorInpUpdate(); // Set initial visor value to 0.

calcButtons.addEventListener('click', (e) =>{
    const { target } = e;

    if (!target.matches('button'))
        return;

    if (target.classList.contains('button__operator')) {
        operate(target.value);
        visorInpUpdate();
        // Change back to AC after selecting an operator
        calcButtons.querySelector('.button__erase').textContent = "AC";
        console.log(calcExpression);
        return
    }

    if (target.classList.contains('button__float')) {
        insertFloat(target.value);
        visorInpUpdate();
        return
    }

    if (target.classList.contains('button__erase')) {
         if (calcButtons.querySelector('.button__erase').textContent === "AC" || calcExpression.waitForSecondOperand && calcExpression.operator) {
             eraseVisor();
         } else {
             backSpace();
         }

        if (calcExpression.visorValue === "") {
            calcExpression.visorValue = "0";
            visorInpUpdate();
            calcButtons.querySelector('.button__erase').textContent = "AC"
        }
        return
    }

    if (target.classList.contains('button__number')) {
        inputDigit(target.value);
        visorInpUpdate();
        // Change AC to C to implement backspace functionality
        if (calcExpression.visorValue !== "0" && (calcExpression.waitForSecondOperand === false || calcExpression.operator )) {
            calcButtons.querySelector('.button__erase').textContent = "C";
        }
    }
});

 // Keyboard Functionality ----------------------------------------------------------------------

document.addEventListener('keydown', (e) =>{

    const keyNumbers = document.querySelectorAll('.button__number');
    const keyOperators =  document.querySelectorAll('.button__operator');

    let keyOperatorsArray = [];
    for (let i = 0; i < keyOperators.length; i++) {
        keyOperatorsArray.push(keyOperators[i].value)
    }

    let keyNumbersArray = [];
    for (let i = 0; i < keyNumbers.length; i++) {
        keyNumbersArray.push(keyNumbers[i].value)
    }

    if (keyOperatorsArray.includes(e.key) || e.key === "Enter") {
        if (e.key === "Enter") {
            e.preventDefault(); // If sqrt is selected, "Enter" was triggering it all the time. preventDefault() used to stop this behavior.
            operate("=");
            visorInpUpdate();
            calcButtons.querySelector('.button__erase').textContent = "AC";
        } else {
            operate(e.key);
            visorInpUpdate();
            calcButtons.querySelector('.button__erase').textContent = "AC";
        }
        return
    }

    if (e.key === ".") {
        insertFloat(e.key);
        visorInpUpdate();
        return
    }

    if (e.key === "Backspace") {
        if (calcButtons.querySelector('.button__erase').textContent === "AC" || calcExpression.waitForSecondOperand && calcExpression.operator) {
            eraseVisor();
        } else {
            backSpace();
        }

        if (calcExpression.visorValue === "") {
            calcExpression.visorValue = "0";
            visorInpUpdate();
            calcButtons.querySelector('.button__erase').textContent = "AC"
        }
        return
    }

    if (keyNumbersArray.includes(e.key)) {
        inputDigit(e.key);
        visorInpUpdate()
        // Change AC to C to implement backspace functionality
        if (calcExpression.visorValue !== "0" && (calcExpression.waitForSecondOperand === false || calcExpression.operator )) {
            calcButtons.querySelector('.button__erase').textContent = "C";
        }
    console.log(calcExpression);
        return
    }
});