let activeNum = "";
let operator = "";
let heldNum = "";
// create display function that checks for the inclusion of activeNum, operator, and heldNum and display accordingly

const displayEquation = () => {
  let displayActive = document.querySelector("#display");
  displayActive.textContent = parseFloat(activeNum);

  let displayFull = document.querySelector("#display-full");

  if (activeNum && operator && heldNum) {
    displayFull.textContent = `${heldNum} ${operator} ${parseFloat(activeNum)}`;
  } else if (heldNum && operator) {
    displayFull.textContent = `${parseFloat(heldNum)} ${operator}`;
  } else if (activeNum) {
    displayFull.textContent = parseFloat(activeNum);
  } else {
    displayFull.textContent = 0;
  }
  // need to find which n is being actively created and display that
};

const makeAllClear = () => {
  activeNum = "";
  operator = "";
  heldNum = "";
};

// if more numbers are clicked than can exist in the display, overflow it

// if leading with decimal, start with "0."
// do not allow second decimal
// no leading with more than 1 zero, allow for "0" to display
const getNumbers = document.querySelectorAll("[data-value]");
getNumbers.forEach(button => {
  button.addEventListener("click", e => {
    let number = e.target.dataset.value;
    if (number === "." && activeNum.includes(".")) return;
    activeNum = activeNum.toString() + number.toString();
    console.log(activeNum);
    displayEquation();
  });
});

const clearEntry = document.querySelector("#clear");
clearEntry.addEventListener("click", e => {
  activeNum = "";
  displayEquation();
});

const allClear = document.querySelector("#all-clear");
allClear.addEventListener("click", e => {
  makeAllClear();
  displayEquation();
});

const backspace = document.querySelector("#backspace");
backspace.addEventListener("click", e => {
  activeNum = activeNum.slice(0, -1);
  console.log(activeNum);
  displayEquation();
});

const getOperator = document.querySelectorAll("[data-op]");
getOperator.forEach(sign => {
  sign.addEventListener("click", e => {
    let sign = e.target.dataset.op;
    if (!operator) {
      console.log("no sign");
      operator = sign;
      heldNum = activeNum;
      activeNum = "0";
      displayEquation();
    }
    console.log(sign);
  });
});

const equals = document.querySelector("#equals");
equals.addEventListener("click", e => {
  console.log(executeOp(heldNum, activeNum, operator));
});

// check if activeNum is blank if yes, do below, if no, create heldNum
// pressing digit rules
// ### can try if it is between positive 1 and negative 1 can lead with 0. for leading decimal test cases
// but only works as a string?

// if digit pressed push to number

// if backspace, then .pop()
// if clear entry, then set n#val = []
// if all clear, then set displayfull (or some other display holder) to ""
// if press operator then number completes getting created and log the operator,
// then check if activeNum and heldNum exists
// if only activeNum exists, create heldNum
// if both activeNum and heldNum exists, compute the numbers and replace it as the new activeNum
// if press equal with only activeNum, no action (and allow users to continue inputing more digits)
// if both activeNum and heldNum exists, compute the 2 numbers

// operate, which completes creating heldNum when equals is pressed, generate answer
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
      answer = "Can't divide by zero!";
    } else {
      answer = n1 / n2;
    }
  }
  return answer;
};

const start = () => {
  displayEquation();
};
window.onload = start();
