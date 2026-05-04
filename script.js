const buttons = document.querySelectorAll('.normal')
const allButtons = document.querySelectorAll('.button')
const specialButtons = document.querySelectorAll('.special')
const displayResult = document.querySelector('.displayResult')

let operatorCheck = false, justCalculated = false;
let operator = "";
let firstNumber = "";
let secondNumber = "";
let textTokens = "";
let firstCheck = false, secondCheck = false;


function operate(num1, op, num2) {
  if (op === "+") return add(num1, num2)
  if (op === "-") return subtract(num1, num2)
  if (op === "*") return multiply(num1, num2)
  if (op === "/") return divide(num1, num2)
}

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
  if (b === 0) return "Error: Divide by 0";
  return a / b;
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
 
    if (justCalculated) {
      firstNumber = "";
      secondNumber = "";
      operator = "";
      textTokens = "";
      operatorCheck = false;
      firstCheck = false;
      secondCheck = false;
      justCalculated = false;
    }

    if (!operatorCheck) {
      if (button.textContent === "." && firstNumber.includes(".")) return;

      firstNumber += button.textContent;
      textTokens += button.textContent;
      firstCheck = true;
    

    } else {
      if (button.textContent === "." && secondNumber.includes(".")) return;

      secondNumber += button.textContent;
      textTokens += button.textContent;
      secondCheck = true;
     
    }

    displayResult.textContent = textTokens;
    
  })
})

specialButtons.forEach((specialButton) => {
  specialButton.addEventListener("click", () => {


    if (operatorCheck && !secondCheck) {
      operator = specialButton.textContent;
      textTokens = textTokens.slice(0, -1) + operator;
      displayResult.textContent = textTokens;
      return;
    }


    if (firstNumber && !operatorCheck) {
      operator = specialButton.textContent;
      textTokens += specialButton.textContent;
      operatorCheck = true;
      displayResult.textContent = textTokens;
    }


    if (firstCheck && secondCheck && operatorCheck) {
      firstNumber = String(operate(Number(firstNumber), operator, Number(secondNumber)));
      operator = specialButton.textContent;
      textTokens = firstNumber + operator;
      displayResult.textContent = textTokens;
      secondNumber = "";
      secondCheck = false;
    }


  })
})

function equalTo() {
  if (!firstNumber || !operator || !secondNumber) return;

  let result = operate(Number(firstNumber), operator, Number(secondNumber));
  displayResult.textContent = result;
  justCalculated = true;

  firstNumber = String(result);
  secondNumber = "";
  operator = "";
  textTokens = String(result);
  operatorCheck = false;
  firstCheck = true;
  secondCheck = false;
}
function Clear() {
  if (textTokens.length === 0) return;

  let lastChar = textTokens.slice(-1);

  textTokens = textTokens.slice(0, -1);

  if (["+", "-", "*", "/"].includes(lastChar)) {
    operator = "";
    operatorCheck = false;
  }


  else if (!operatorCheck) {
    firstNumber = firstNumber.slice(0, -1);
  }


  else {
    secondNumber = secondNumber.slice(0, -1);
  }

  displayResult.textContent = textTokens;
}
function allClear()
{
  displayResult.textContent = ""
  firstNumber = "";
  secondNumber = "";
  operator = "";
  textTokens = "";
  operatorCheck = false;
  firstCheck = false;
  secondCheck = false;
  justCalculated = false ;
}