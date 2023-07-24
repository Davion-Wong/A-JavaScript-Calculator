import React, {useState} from 'react';

function Calculator() {
  const [inputString, setInput] = useState('0');
  const [result, setResult] = useState('0');

  const handleNumberClick = (number) => {
    setInput((prevInput) => {
      if (prevInput.length >= 16) {
        return prevInput;
      } else {
        return prevInput === '0' ? String(number) : prevInput + number;
      }
    });
  }
  
  const handleOperatorClick = (operator) => {
    setInput((prevInput) => {
      if (prevInput.length >= 16) {
        return prevInput;
      } else {
        if (['+', '-', '*', '/'].includes(prevInput.slice(-1))) {
          if (prevInput.slice(-1) === '-' && operator !== '-') {
            return prevInput + operator;
          } else {
            return prevInput.slice(0, -1) + operator;
          }
        } else {
          return prevInput + operator;
        }
      }
    });
  };

  const handleDecimalClick = () => {
    setInput(preInput => {
        // If the current number already has a decimal point, return the current input string
        if (/\.\d*$/.test(preInput)) {
            return preInput;
        } else {
            // If the current number doesn't have a decimal point, append one
            return preInput + '.';
        }
    });
};

  const handleClearClick = () => {
    setResult('0');
    setInput('0');
  }

  const calculateResult = (inputString) => {
    let numArr = inputString.split(/\+|\-|\*|\//g);
    let operatorArr = inputString.replace(/[0-9]|\./g, '').split('');
    let multiplyDivide = operatorArr.indexOf('*') > -1 ? operatorArr.indexOf('*') : operatorArr.indexOf('/');
  
    while (multiplyDivide !== -1) {
      if (operatorArr[multiplyDivide] === '*') {
        numArr.splice(multiplyDivide, 2, numArr[multiplyDivide] * numArr[multiplyDivide + 1]);
      } else if (operatorArr[multiplyDivide] === '/') {
        numArr.splice(multiplyDivide, 2, numArr[multiplyDivide] / numArr[multiplyDivide + 1]);
      }
      operatorArr.splice(multiplyDivide, 1);
      multiplyDivide = operatorArr.indexOf('*') > -1 ? operatorArr.indexOf('*') : operatorArr.indexOf('/');
    }
  
    let addSubtract = operatorArr.indexOf('+') > -1 ? operatorArr.indexOf('+') : operatorArr.indexOf('-');
    while (addSubtract !== -1) {
      if (operatorArr[addSubtract] === '+') {
        numArr.splice(addSubtract, 2, parseFloat(numArr[addSubtract]) + parseFloat(numArr[addSubtract + 1]));
      } else if (operatorArr[addSubtract] === '-') {
        numArr.splice(addSubtract, 2, parseFloat(numArr[addSubtract]) - parseFloat(numArr[addSubtract + 1]));
      }
      operatorArr.splice(addSubtract, 1);
      addSubtract = operatorArr.indexOf('+') > -1 ? operatorArr.indexOf('+') : operatorArr.indexOf('-');
    }
  
    return numArr[0];
  }
  

  const handleEqualsClick = () => {
    setResult(calculateResult(inputString));
  };

  return(
    <div id="main-container">
      <header id="header">
        JavaScript Calculator
      </header>
      <div id="display">
        <div id="input-string">{inputString}</div>
        <div id="result">{result}</div>
      </div>
      <div id="button-container">
        <button id="seven" key="seven" onClick={() => handleNumberClick(7)}>
            7
        </button>
        <button id="eight" key="eight" onClick={() => handleNumberClick(8)}>
            8
        </button>
        <button id="nine" key="nine" onClick={() => handleNumberClick(9)}>
            9
        </button>
        <button id="add" key="add" onClick={() => handleOperatorClick("+")}>
            +
        </button>
        <button id="clear" onClick={handleClearClick}>AC</button>
        <button id="four" key="four" onClick={() => handleNumberClick(4)}>
            4
        </button>
        <button id="five" key="five" onClick={() => handleNumberClick(5)}>
            5
        </button>
        <button id="six" key="six" onClick={() => handleNumberClick(6)}>
            6
        </button>
        <button id="subtract" key="subtract" onClick={() => handleOperatorClick("-")}>
            -
        </button>
        <button id="one" key="one" onClick={() => handleNumberClick(1)}>
            1
        </button>
        <button id="two" key="two" onClick={() => handleNumberClick(2)}>
            2
        </button>
        <button id="three" key="three" onClick={() => handleNumberClick(3)}>
            3
        </button>
        <button id="multiply" key="multiply" onClick={() => handleOperatorClick("*")}>
            *
        </button>
        <button id="equals" onClick={handleEqualsClick}>=</button>
        <button id="zero" key="zero" onClick={() => handleNumberClick(0)}>
            0
        </button>
        <button id="decimal" onClick={handleDecimalClick}>.</button>
        <button id="divide" key="divide" onClick={() => handleOperatorClick("/")}>
            /
        </button>
      </div>
      <footer>Created By<br />ZiLong Wang</footer>
    </div>
  )
}

export default Calculator;