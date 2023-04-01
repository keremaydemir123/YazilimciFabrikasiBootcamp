const output = document.querySelector(".screen__output");

function clearOutput() {
  output.textContent = "";
}

function deleteLast() {
  const currentValue = output.textContent;
  output.textContent = currentValue.slice(0, currentValue.length - 1);
}

function displayOnScreen(value) {
  const currentValue = output.textContent;
  // check if there are two operators in a row
  const operators = ["+", "-", "*", "/"];
  const lastChar = currentValue[currentValue.length - 1];
  // if the last char is an operator or the current char is an operator
  // after the last char which is also an operator
  // do not display it
  if (!operators.includes(lastChar) || !operators.includes(value)) {
    output.textContent += value;
  }
}

function calculate() {
  const currentValue = output.textContent;
  let result;

  try {
    result = eval(currentValue);
    console.log(currentValue);
    console.log(result);
    if (result == "Infinity") {
      output.textContent = "Error: Divided by zero";
    } else {
      const strArr = [...result.toString()];
      const idx = strArr.findIndex((c) => c === ".");
      // check if its too long to display
      if (idx > 0) {
        const decimal = result.toString().slice(idx);
        if (decimal.length > 10) {
          output.textContent = result.toFixed(10);
        } else {
          output.textContent = result;
        }
      } else {
        output.textContent = result;
      }
    }
  } catch (e) {
    if (e instanceof SyntaxError) {
      output.textContent = "Syntax Error";
    } else {
      throw "Error";
    }
  }
}
