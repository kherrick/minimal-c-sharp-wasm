// clear the display and calculator model
export const clear = (calculator) => {
  calculator.numbers.first = "";
  calculator.numbers.second = "";
  calculator.operation = "";

  document.getElementById("result").value = "";
};

// regex used to determine if the button is a calculator operation
export const isOperation = (val) => val.match(/[+\-*/]/) !== null;

// determine next steps for the calculator
export const resolveOperations = (Calculator, calculator, val) => {
  // prevent two decimals
  if (document.getElementById("result").value.includes(".") && val === ".") {
    return;
  }

  // handle "c" key and escape key
  if (val === "c" || val === "Escape") {
    clear(calculator);

    return;
  }

  // handle equals and enter key
  if (val === "=" || val === "Enter") {
    solve(Calculator, calculator);

    return;
  }

  // handle operation and number1
  if (!calculator.operation) {
    // handle operation
    if (isOperation(val)) {
      calculator.operation = val;
      document.getElementById("result").value = val;

      return;
    }

    // handle number1
    calculator.numbers.first += val;
    document.getElementById("result").value += val;

    return;
  } else {
    // prevent changing operation before solving
    if (isOperation(val)) {
      return;
    }
  }

  // handle first time seeing number2
  if (!calculator.numbers.second) {
    calculator.numbers.second = val;
    document.getElementById("result").value = val;

    return;
  }

  // handle appending to number2
  calculator.numbers.second += val;
  document.getElementById("result").value += val;
};

// solve the stored equation and set the result
export const solve = (Calculator, calculator) => {
  let result = null;

  const number1 = calculator.numbers.first;
  const number2 = calculator.numbers.second;

  // determine operation
  if (calculator.operation === "+") {
    result = Calculator.add(number1, number2);
  }

  if (calculator.operation === "-") {
    result = Calculator.subtract(number1, number2);
  }

  if (calculator.operation === "*") {
    result = Calculator.multiply(number1, number2);
  }

  if (calculator.operation === "/") {
    result = Calculator.divide(number1, number2);
  }

  // display result
  if (result !== null) {
    // clear display and model
    clear(calculator);

    // set result as first number
    calculator.numbers.first = result;
    document.getElementById("result").value = result;
  }
};
