import { clear } from "./utils.js";
import { getAssemblyExports } from "./main.js";
import { handleCalculatorButtons, handleCalculatorValue, handleKeydownAndPaste } from "./eventHandlers.js";

// setup model for calculator
const model = {
  numbers: {
    first: "",
    second: "",
  },
  operation: "",
};

/* define placeholder for instance of C# calculator */
let Calculator = null;

/* set C# calculator */
getAssemblyExports().then((assemblyExports) => {
  Calculator = assemblyExports.Calculator;
});

/* clear the calculator on first load */
clear(model);

/* setup event handlers for paste and keydown */
document.body.addEventListener("keydown", (e) => handleKeydownAndPaste(Calculator, model, e));
document.body.addEventListener("paste", (e) => handleKeydownAndPaste(Calculator, model, e));

/* setup event handlers for clicking buttons */
document.querySelectorAll("input[type=button")
  .forEach((el) => el.addEventListener("click", (e) => handleCalculatorButtons(Calculator, model, e, el)));

/* prevent modifying the results directly */
document.getElementById("result").addEventListener("click", (e) => e.preventDefault());
document.getElementById("result").addEventListener("keydown", (e) => e.preventDefault());

/* focus clear button */
document.querySelector("[value='c']").focus();
