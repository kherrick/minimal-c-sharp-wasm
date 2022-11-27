import { getAssemblyExports } from "../../dist/minimal-c-sharp-wasm/main.js";

/* define placeholder for instance of C# calculator */
let Calculator = null;

/* set C# calculator */
getAssemblyExports().then((assemblyExports) => {
  Calculator = assemblyExports.Calculator;
});

// setup model for calculator
const calculator = {
  numbers: {
    first: "",
    second: "",
  },
  operation: "",
};

// regex used to determine if the button is a calculator operation
const isOperation = (val) => val.match(/[+\-*/]/) !== null;

// solve the stored equation and set the result
const solve = () => {
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
    clear();

    // set result as first number
    calculator.numbers.first = result;
    document.getElementById("result").value = result;
  }
};

// event handler for calculator buttons
const handleCalculatorButton = (val) => {
  // prevent two decimals
  if (document.getElementById("result").value.includes(".") && val === ".") {
    return;
  }

  // handle "c" key
  if (val === "c") {
    clear();

    return;
  }

  // handle equals and enter key
  if (val === "=" || val === "Enter") {
    solve();

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

// event handler for keyboard usage
export const handleCalculatorValue = (value) => {
  if (
    value == "Enter" ||
    value == "." ||
    value == "=" ||
    value == "c" ||
    value == "0" ||
    value == "1" ||
    value == "2" ||
    value == "3" ||
    value == "4" ||
    value == "5" ||
    value == "6" ||
    value == "7" ||
    value == "8" ||
    value == "9" ||
    value == "+" ||
    value == "-" ||
    value == "*" ||
    value == "/"
  ) {
    handleCalculatorButton(value);
  }
};

// clear the display and calculator model
export const clear = () => {
  calculator.numbers.first = "";
  calculator.numbers.second = "";
  calculator.operation = "";

  document.getElementById("result").value = "";
};
