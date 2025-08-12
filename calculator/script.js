"use strict";

(function initCalculator() {
  const displayElement = document.getElementById("display");
  const keysContainer = document.querySelector(".keys");

  /**
   * Calculator state
   */
  const state = {
    currentInput: "0", // string representation of the number being typed
    previousValue: null, // number
    pendingOperator: null, // one of "+", "-", "*", "/"
    overwriteOnNextDigit: false, // when an operation or equals was pressed
    lastOperand: null, // for repeating equals
  };

  function updateDisplay(text) {
    displayElement.value = text;
  }

  function formatNumberForDisplay(value) {
    if (value === "Error") return value;

    const asNumber = Number(value);
    if (!Number.isFinite(asNumber)) return "Error";

    // Limit significant digits to avoid floating point noise
    const rounded = Number.parseFloat(asNumber.toPrecision(12));

    // If the number is very large or small, use toExponential
    if ((Math.abs(rounded) >= 1e10 || (Math.abs(rounded) > 0 && Math.abs(rounded) < 1e-6)) && !Number.isInteger(rounded)) {
      return rounded.toExponential(6).replace(/\+?0*(\d+)/, "$1");
    }

    // Keep up to 10 decimals but trim trailing zeros
    const fixed = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(10);
    return fixed.replace(/\.0+$/, "").replace(/(\.\d*?)0+$/, "$1");
  }

  function inputDigit(digit) {
    if (state.overwriteOnNextDigit) {
      state.currentInput = digit;
      state.overwriteOnNextDigit = false;
      updateDisplay(state.currentInput);
      return;
    }

    if (state.currentInput === "0") {
      state.currentInput = digit;
    } else {
      state.currentInput += digit;
    }
    updateDisplay(state.currentInput);
  }

  function inputDecimal() {
    if (state.overwriteOnNextDigit) {
      state.currentInput = "0.";
      state.overwriteOnNextDigit = false;
      updateDisplay(state.currentInput);
      return;
    }
    if (!state.currentInput.includes(".")) {
      state.currentInput += ".";
      updateDisplay(state.currentInput);
    }
  }

  function clearAll() {
    state.currentInput = "0";
    state.previousValue = null;
    state.pendingOperator = null;
    state.overwriteOnNextDigit = false;
    state.lastOperand = null;
    updateDisplay(state.currentInput);
  }

  function clearEntry() {
    if (state.overwriteOnNextDigit) {
      state.currentInput = "0";
      state.overwriteOnNextDigit = false;
    } else if (state.currentInput.length > 1) {
      state.currentInput = state.currentInput.slice(0, -1);
    } else {
      state.currentInput = "0";
    }
    updateDisplay(state.currentInput);
  }

  function toggleSign() {
    if (state.currentInput === "0") return;
    if (state.currentInput.startsWith("-")) {
      state.currentInput = state.currentInput.slice(1);
    } else {
      state.currentInput = "-" + state.currentInput;
    }
    updateDisplay(state.currentInput);
  }

  function percent() {
    const current = Number(state.currentInput);
    const result = current / 100;
    state.currentInput = formatNumberForDisplay(result);
    updateDisplay(state.currentInput);
  }

  function performPendingOperation() {
    if (state.pendingOperator == null || state.previousValue == null) {
      return Number(state.currentInput);
    }
    const a = state.previousValue;
    const b = Number(state.currentInput);
    const op = state.pendingOperator;

    let result;
    switch (op) {
      case "+":
        result = a + b;
        break;
      case "-":
        result = a - b;
        break;
      case "*":
        result = a * b;
        break;
      case "/":
        if (b === 0) {
          return "Error";
        }
        result = a / b;
        break;
      default:
        result = b;
    }

    return result;
  }

  function chooseOperator(operator) {
    if (state.pendingOperator && !state.overwriteOnNextDigit) {
      // Compute existing pending operation first
      const result = performPendingOperation();
      if (result === "Error") {
        clearAll();
        updateDisplay("Error");
        state.overwriteOnNextDigit = true;
        return;
      }
      state.previousValue = Number(result);
      state.currentInput = formatNumberForDisplay(result);
      updateDisplay(state.currentInput);
    } else {
      state.previousValue = Number(state.currentInput);
    }
    state.pendingOperator = operator;
    state.overwriteOnNextDigit = true;
    state.lastOperand = null;
  }

  function equals() {
    let result;
    if (state.pendingOperator != null) {
      result = performPendingOperation();
      state.lastOperand = Number(state.currentInput);
    } else if (state.lastOperand != null && state.previousValue != null) {
      // Repeat last equals
      const a = Number(state.currentInput);
      const b = state.lastOperand;
      switch (state.pendingOperator || "+") {
        case "+":
          result = a + b; break;
        case "-":
          result = a - b; break;
        case "*":
          result = a * b; break;
        case "/":
          result = (b === 0) ? "Error" : a / b; break;
      }
    } else {
      result = Number(state.currentInput);
    }

    if (result === "Error" || !Number.isFinite(Number(result))) {
      updateDisplay("Error");
      state.currentInput = "0";
      state.previousValue = null;
      state.pendingOperator = null;
      state.overwriteOnNextDigit = true;
      return;
    }

    state.currentInput = formatNumberForDisplay(result);
    updateDisplay(state.currentInput);
    state.previousValue = Number(result);
    state.overwriteOnNextDigit = true;
    // Keep operator for repeated equals
  }

  function handleButtonClick(event) {
    const target = event.target;
    if (!(target instanceof HTMLButtonElement)) return;

    if (target.classList.contains("digit")) {
      const digit = target.dataset.digit ?? (target.textContent || "");
      inputDigit(digit);
      return;
    }

    const action = target.dataset.action;
    const operator = target.dataset.operator;

    switch (action) {
      case "decimal":
        inputDecimal();
        break;
      case "clear-all":
        clearAll();
        break;
      case "clear-entry":
        clearEntry();
        break;
      case "toggle-sign":
        toggleSign();
        break;
      case "percent":
        percent();
        break;
      case "equals":
        equals();
        break;
      default:
        if (operator) {
          chooseOperator(operator);
        }
        break;
    }
  }

  function handleKeydown(event) {
    const { key } = event;

    if (/^[0-9]$/.test(key)) {
      inputDigit(key);
      return;
    }
    if (key === ".") {
      inputDecimal();
      return;
    }
    if (key === "+" || key === "-" || key === "*" || key === "/") {
      chooseOperator(key);
      return;
    }
    if (key === "Enter" || key === "=") {
      event.preventDefault();
      equals();
      return;
    }
    if (key === "Escape") {
      clearAll();
      return;
    }
    if (key === "Backspace") {
      clearEntry();
      return;
    }
    if (key === "%") {
      percent();
      return;
    }
  }

  keysContainer.addEventListener("click", handleButtonClick);
  window.addEventListener("keydown", handleKeydown);

  // Initialize display
  updateDisplay(state.currentInput);
})();