// Objects

calcExpression = {
    visorValue: 0,
    firstOperand: null,
    operator: null,
    waitForSecondOperand: false,
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
    const { firstOperand, operator, visorValue } = calcExpression
    const inputedValue = parseFloat(visorValue);

    if (firstOperand == null) {
        calcExpression.firstOperand = inputedValue;
    }

    if (firstOperand != null) {
        const result = chooseOperation(operator)
        return
    }

    calcExpression.waitForSecondOperand = true;
    calcExpression.operator = selectedOperator;
}

    // Functions --- Operations

// function sum(a, b) {
//     return a + b;
// }
//
// function subtract(a, b) {
//     let subtract = a - b;
//     return subtract;
// }
//
// function multiply(a, b) {
//     let product = a * b;
//     return product;
// }
//
// function divide(a, b) {
//     let quot = a / b;
//     if (quot == Infinity) {
//         return "Error"
//     } else {
//         return quot;
//     }
// }

// function percentage() {

// }

// function operate(type, a, b) {
//     a = parseInt(visorInp.textContent);
//     switch (type) {
//         case "add":
//             sum(a, b)
//             break;
//         case "subtract":
//             console.log("subtract");
//             break;
//         case "mult":
//             console.log("mult");
//             break;
//         case "div":
//             console.log("div");
//             break;
//         case "perc":
//             console.log("perc");
//             break;
//         default:
//             console.log("Error")
//     }
//     return;
// }


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