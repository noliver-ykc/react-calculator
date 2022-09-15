import './styles.css';

function App() {
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">123dddddd5 *</div>
        <div className="current-operand">35</div>
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
