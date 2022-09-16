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
    case ACTIONS.CLEAR:
      return {}


  }
}


function App() {
  const [{currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  )

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{previousOperand} {operation}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button
        className="span-two operator"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button
        className="operator"
        onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operator: "DEL" } })}

      >DEL
      </button>
      <button
        className="operator"
        onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operator: "÷" } })}

      >÷
      </button>
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <button
        className="operator"
        onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operator: "*" } })}

      >*
      </button>
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <button
        className="operator"
        onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { digit: "+" } })}

      >+
      </button>
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <button
        className="operator"
        onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operator: "-" } })}

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
        onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operator: "=" } })}

      >=
      </button>
    </div>
  );
}

export default App;
