let activeNum = "0";
let operator = "";
let heldNum = "0";

const displayEquation = () => {
  const displayFull = document.querySelector("#display-full");
  const displayActive = document.querySelector("#display");

  let parseHeld = parseFloat(heldNum);
  let parseActive = parseFloat(activeNum);

  if (activeNum.includes(".")) {
    let numArray = activeNum.split(".");
    parseActive = `${parseFloat(numArray[0])}.${numArray[1]}`;
  }

  if (!isNaN(heldNum)) {
    displayActive.textContent = parseActive;
    if (activeNum !== "0" && operator && heldNum) {
      displayFull.textContent = `${parseHeld} ${operator} ${parseActive}`;
    } else if (activeNum === "0" && heldNum && operator) {
      displayFull.textContent = `${parseHeld} ${operator}`;
    } else if (activeNum) {
      displayFull.textContent = parseActive;
    } else {
      displayFull.textContent = 0;
    }
  } else if (isNaN(activeNum) || isNaN(heldNum)) {
    displayActive.textContent = "😱😱😱";
    displayFull.textContent = "not possible...!";
    makeAllClear();
  }
};

const assignOperator = sign => {
  if (!operator) {
    operator = sign;
    heldNum = activeNum;
  } else if (operator && activeNum && heldNum) {
    heldNum = executeOp(heldNum, activeNum, operator);
    operator = sign;
  } else if (isNaN(heldNum)) {
    heldNum = "0";
  }
  activeNum = "0";
};

const executeOp = (first, second, operator) => {
  let answer = 0;
  let n1 = parseFloat(first);
  let n2 = parseFloat(second);
  if (operator === "x") {
    answer = n1 * n2;
  } else if (operator === "-") {
    answer = n1 - n2;
  } else if (operator === "+") {
    answer = n1 + n2;
  } else if (operator === "÷") {
    if (n2 === 0) {
      answer = NaN;
      operator = "";
      heldNum = NaN;
    } else {
      answer = n1 / n2;
    }
  }
  return answer;
};

const computeEquals = () => {
  activeNum = executeOp(heldNum, activeNum, operator).toString();
  if (isNaN(activeNum)) {
    heldNum = NaN;
  }
  operator = "";
};

const useBackspace = () => (activeNum = activeNum.slice(0, -1));

const makeAllClear = () => {
  activeNum = "0";
  operator = "";
  heldNum = "0";
};

window.addEventListener("keydown", logKey);
function logKey(e) {
  let number = e.key;
  let numParse = parseFloat(number);
  if (!isNaN(numParse) || number === ".") {
    activeNum = activeNum.toString() + number.toString();
  } else if (number === "Backspace") {
    useBackspace(); // need fix keyboard backspace to prevent NaN
  } else if (number === "=" || number === "Enter") {
    computeEquals();
  } else if (number === "-" || number === "+") {
    let sign = number;
    assignOperator(sign);
  } else if (number === "/") {
    e.preventDefault(); // disable FireFox "/" quicksearch in browser
    let sign = "÷";
    assignOperator(sign);
  } else if (number === "x" || number === "*") {
    let sign = "x";
    assignOperator(sign);
  }
  displayEquation();
}

const getNumbers = document.querySelectorAll("[data-value]");
getNumbers.forEach(button => {
  button.addEventListener("click", e => {
    let number = e.target.dataset.value;
    if (number === "." && activeNum.includes(".")) return;
    activeNum = activeNum.toString() + number.toString();
    displayEquation();
  });
});

const backspace = document.querySelector("#backspace");
backspace.addEventListener("click", e => {
  if (activeNum.length > 1) {
    useBackspace();
    displayEquation();
  }
});

const clearEntry = document.querySelector("#clear");
clearEntry.addEventListener("click", e => {
  activeNum = "0";
  displayEquation();
});

const allClear = document.querySelector("#all-clear");
allClear.addEventListener("click", e => {
  makeAllClear();
  displayEquation();
});

const getOperator = document.querySelectorAll("[data-op]");
getOperator.forEach(sign => {
  sign.addEventListener("click", e => {
    let sign = e.target.dataset.op;
    assignOperator(sign);
    displayEquation();
  });
});

const equals = document.querySelector("#equals");
equals.addEventListener("click", e => {
  computeEquals();
  displayEquation();
});

const start = () => {
  displayEquation();
};
window.onload = start();
