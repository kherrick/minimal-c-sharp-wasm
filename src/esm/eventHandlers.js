import { clear, isOperation, resolveOperations, solve } from "./utils.js";

// common handler for all calculator values
export const handleCalculatorValue = (Calculator, model, val) => {
  if (
    val == "Escape" ||
    val == "Enter" ||
    val == "." ||
    val == "=" ||
    val == "c" ||
    val == "0" ||
    val == "1" ||
    val == "2" ||
    val == "3" ||
    val == "4" ||
    val == "5" ||
    val == "6" ||
    val == "7" ||
    val == "8" ||
    val == "9" ||
    val == "+" ||
    val == "-" ||
    val == "*" ||
    val == "/"
  ) {
    resolveOperations(Calculator, model, val);
  }
};

// event handler for keydown and paste
export const handleKeydownAndPaste = (Calculator, model, e) => {
  let val = e.key;

  // get value from result if paste is used
  if (e.type === "paste") {
    val = document.getElementById("result").value;
  }

  // prevent spacebar when a calculator button is not selected
  if (e.key === " ") {
    return
  }

  handleCalculatorValue(Calculator, model, val);
};

// event handler for calculator buttons
export const handleCalculatorButtons = (Calculator, model, e, el) => {
  // handle only clicks without detail (0) that identify as a space key
  if (!e?.detail && (e?.key !== ' ')) {
    return;
  }

  handleCalculatorValue(Calculator, model, el.value);
};
