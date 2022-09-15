import { useReducer } from 'react';
import './styles.css';

// defining these here to avoid hardcoding the operations
const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate"
}

function reducer(state, {type, payload}) {
  // reducers usually have a switch statement
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      return {
        ...state,
        // or statement is to make sure if current_O is null for somereason
        currentOperand: `${currentOperand || ""}${payload.digit}`,
      }
  }
}
//13:25

function App() {
  const[{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {})

  dispatch({type: ACTIONS.ADD_DIGIT, payload: { digit: 1 }})
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{previousOperand} {operation}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-two operator">AC</button>
      <button className='operator'>DEL</button>
      <button className='operator'>÷</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button className='operator'>*</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button className='operator'>+</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button className='operator'>-</button>
      <button className='bottom-left-curve operator'>.</button>
      <button>0</button>
      <button className="span-two bottom-right-curve operator">=</button>
    </div>
  );
}

export default App;
