import { useReducer } from 'react';
import DigitButton from './DigitButton';
import './styles.css';

// defining these here to avoid hardcoding the operations
export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      // if theres numbers left in the box from the previous calculation-- clear
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }

      // you cant start with more than one 0
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state
      }
      // you cant have more than one decimal point per entry
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state
      }

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        }
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        }
      }
      //this will evaluate the previous two numbers before stagging a new eval
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      }

    case ACTIONS.CLEAR:
      return {}

    case ACTIONS.EVALUATE:
      if (
        // checks that you have a full problem to evaluate
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      }

    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        }
      }
      if (state.currentOperand == null) return state
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null }
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      }

    default:
      return


  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if (isNaN(prev) || isNaN(current)) return ""
  let computation = ""
  switch (operation) {
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "*":
      computation = prev * current
      break
    case "÷":
      computation = prev / current
      break
    default:
      return
  }

  return computation.toString()
}

// to add commas between long numbers
const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})
// for decimals, we dont want it to mess with multiple 0's after the .
function formatOperand(operand) {
  if (operand == null) return
  const [integer, decimal] = operand.split(".")
  if (decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {
  const [{currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  )

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{formatOperand(previousOperand)} {operation}</div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>
      <button
        className="span-two operator"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button
        className="operator"
        onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT, payload: { operation: "DEL" } })}

      >DEL
      </button>
      <button
        className="operator"
        onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: "÷" } })}

      >÷
      </button>
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <button
        className="operator"
        onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: "*" } })}

      >*
      </button>
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <button
        className="operator"
        onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: "+" } })}

      >+
      </button>
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <button
        className="operator"
        onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: "-" } })}

      >-
      </button>
      <button
        className="bottom-left-curve"
        onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { digit: "." } })}

      >.
      </button>
      <DigitButton digit="0" dispatch={dispatch} />
      <button
        className="span-two bottom-right-curve operator"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE, payload: { operation: "=" } })}

      >=
      </button>
    </div>
  );
}

export default App;
