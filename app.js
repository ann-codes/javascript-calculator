let n1 = 0;
let n2 = 0;
let sign = "";
let displayFull = `${n1} ${sign} ${n2}`;
let displaySingle = 0;
// create display function that checks for the inclusion of n1, sign, and n2 and display accordingly

document.querySelector("#display-full").textContent = displayFull;
document.querySelector("#display").textContent = displaySingle;
// if more numbers are clicked than can exist in the display, overflow it

// get n1
let n1val = [];
let n2val = [];
let displayValues = [];
document.querySelector(".buttons-box").addEventListener("click", e => {

  // check if n1 is blank if yes, do below, if no, create n2

  // if digit pressed then do below
  let digit = e.target.dataset.value;
  console.log(digit);
  n1val.push(digit);
  console.log(n1val);

  // if first decimal, push to decimal array
    // if starts with decimal as first press, push("0.")
    // if second decminal, no action
  // if backspace, then .pop()
  // if clear entry, then set n#val = [] 
  // if all clear, then set displayfull (or some other display holder) to ""
  // if press sign then number completes getting created and log the sign, 
    // then check if n1 and n2 exists
      // if only n1 exists, create n2
      // if both n1 and n2 exists, compute the numbers and replace it as the new n1
  // if press equal with only n1, no action (and allow users to continue inputing more digits)
  // if both n1 and n2 exists, compute the 2 numbers
  
});

// operate, which completes creating n2 when equals is pressed, generate answer
const operate = (n1, n2, sign) => {
  let answer = 0;
  if (sign === "x") {
    answer = n1 * n2;
  } else if (sign === "-") {
    answer = n1 - n2;
  } else if (sign === "+") {
    answer = n1 + n2;
  } else if (sign === "/") {
    if (n2 === 0) {
      answer = "Can't divide by zero!";
    } else {
      answer = n1 / n2;
    }
  }
  return answer;
};


