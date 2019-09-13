//Variables

    // Numbers 

const btnNumber = document.querySelectorAll(".button__number");

    // Operations

const btnAdd = document.querySelector(".button__add");
const btnSubtr = document.querySelector(".button__minus");
const btnMult = document.querySelector(".button__multiply");
const btnDivi = document.querySelector(".button__division");
const btnEqual = document.querySelector(".button__equal");
const btnPerc = document.querySelector(".button__percentage");

    //Erase 

const btnErase = document.querySelector(".button__erase");


    //Float & Parenthesis 

const btnParen = document.querySelectorAll(".button__paren");
const btnFloat = document.querySelector(".button__float");


    // Visor 

const visorOut = document.querySelector(".visor__output");
const visorInp = document.querySelector(".visor__input");

    // Activated 

let equal = false
let add = false
let minus = false
let float = false
let mult = false
let div = false

//Functions

// function add([...args]) {
//     let sum = [...args].reduce((total, number) => {
//         return total + number;
//     }, 0)
//     return sum;
// }

// function subtract([...args]) {
//     let subtract = [...args].reduce((total, number) => {
//         return total - number;
//     }, 0)
//     return subtract;
// }

// console.log(divide([1,0, 3]))

// function multiply([...args]) {
//     let product = [...args].reduce((total, number) => {
//         return total * number;
//     })
//     return product;
// }


// function divide([...args]) {
//     let quot = [...args].reduce((total, number) => {        
//         if (total/number ==!  NaN && total/number ==! Infinity) {
//             return total/number
//         } else {
//             return "Error";
//         }
//     })
//     return quot;
// }

    // Functions --- Operations

// function add(a, b) {
//     let sum = a + b;
//     return sum;
// }

// function subtract(a, b) {
//     let subtract = a - b;
//     return subtract;
// }

// function multiply(a, b) {
//     let product = a * b;
//     return product;
// }

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

// function operate(type) {
//     switch (type) {
//         case "add":
//             console.log("add");
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


//EventListeners

document.querySelector(".calculator__buttons").addEventListener("click", (e) =>{
    if (e.target.classList.contains('button__number')) {
        if (equal === true && (add === false ||
            minus === false || mult === false || div === false)) {
            visorInp.textContent = ""
        }
        equal = false
        visorInp.textContent += e.target.textContent;
        console.log(visorInp.textContent);
    }
})

btnAdd.addEventListener("click", (e) =>{
    add = true;
    console.log(add)
    visorInp.textContent += " " + e.target.textContent + " ";
    // operate("add");
    return;
});

btnSubtr.addEventListener("click", (e) =>{
    minus = true;
    visorInp.textContent += " " + e.target.textContent + " ";
    // operate("subtract");
    return;
});

btnMult.addEventListener("click", () =>{
    mult = true;
    visorInp.textContent += " * ";
    // operate("mult");
    return;
});

btnDivi.addEventListener("click", () =>{
    div = true;
    visorInp.textContent += " / ";
    // operate("div");
    return;
});

btnPerc.addEventListener("click", (e) =>{
    visorInp.textContent += e.target.textContent + " ";
    // operate("perc");
    return;
});


btnEqual.addEventListener("click", () =>{
    equal = true
    add = false;
    minus = false;
    float = false;
    mult = false;
    div = false;
    let result = Function(`return (` + visorInp.textContent + `)`)
    console.log(result(visorInp.textContent))
    visorOut.textContent = visorInp.textContent + " ="
    visorInp.textContent = result(visorInp.textContent);
    return equal
})

btnErase.addEventListener("click", (e) =>{

})

// let equal = false
// let add = false
// let minus = false
// let float = false
// let mult = false
// let div = false



//Execution