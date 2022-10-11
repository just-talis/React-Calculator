import { useEffect, useState } from 'react';
import {NumericFormat} from 'react-number-format';

import './App.css'

export default function App() {
  const [prevState, setPrevState] = useState('')
  const [currentState, setCurrentState] = useState('')
  const [input, setInput] = useState('0')
  const [operator, setOperator] = useState(null)
  const [total, setTotal] = useState(false)

  const inputNum = (e) => {
    if (currentState.includes('.') && e.target.innerText === '.') {
      return
    }
    if (total) {
      setPrevState('')
    }

    currentState
      ? setCurrentState(pre => pre + e.target.innerText)
      : setCurrentState(e.target.innerText)
    setTotal(false)

    }

useEffect(() => {
    setInput(currentState)
  }, [currentState])
  useEffect(() => {
    setInput('0')
  }, [])

  const operatorType = (event) => {
    setTotal(false)
    setOperator(event.target.innerText)
    if (currentState === '') return
    if (prevState !== '') {
      equals()
    } else {
      setPrevState(currentState)
      setCurrentState('')
    }
  }
  const equals = event => {
    if (event?.target.innerText === '=') {
      setTotal(true)
    }
    let calc
    switch (operator) {
      case '/':
        calc = String(parseFloat(prevState) / parseFloat(currentState))
        break
      case '+':
        calc = String(parseFloat(prevState) + parseFloat(currentState))
        break
      case '*':
        calc = String(parseFloat(prevState) * parseFloat(currentState))
        break
      case '-':
        calc = String(parseFloat(prevState) - parseFloat(currentState))
        break
      default:
        return
    }
setInput('')
setPrevState(calc)
setCurrentState('')

  }
  const minusPlus = event => {
    if (currentState.charAt(0) === '-') {
      setCurrentState(currentState.substring(1))
    } else{
      setCurrentState('-'+currentState)
    }
  }
  const reset = event => {
    setPrevState('')
    setCurrentState('')
    setInput('0')
  }
  const percent = event => {
    prevState ? setCurrentState(String(parseFloat(currentState) / 100 * prevState)) : setCurrentState(String(parseFloat(currentState) / 100))
  }
  return (
  <div className="container">
      <div className='wrapper'>
        <div className='screen'>{input !== '' || input === '0' ? <NumericFormat value={input} displayType={'text'} thousandSeparator={true} /> : <NumericFormat value={prevState} displayType={'text'} thousandSeparator={true}/>}</div>
        <div className='btn light-purple' onClick={reset}>AC</div>
        <div className='btn light-purple' onClick={percent}>%</div>
        <div className='btn light-purple' onClick={minusPlus}>+/-</div>
        <div className='btn purple' onClick={operatorType}>/</div>
        <div className='btn' onClick={inputNum}>7</div>
        <div className='btn' onClick={inputNum}>8</div>
        <div className='btn' onClick={inputNum}>9</div>
        <div className='btn purple' onClick={operatorType}>*</div>
        <div className='btn' onClick={inputNum}>4</div>
        <div className='btn' onClick={inputNum}>5</div>
        <div className='btn' onClick={inputNum}>6</div>
        <div className='btn purple' onClick={operatorType}>+</div>
        <div className='btn' onClick={inputNum}>1</div>
        <div className='btn' onClick={inputNum}>2</div>
        <div className='btn' onClick={inputNum}>3</div>
        <div className='btn purple' onClick={operatorType}>-</div>
        <div className='btn zero' onClick={inputNum}>0</div>
        <div className='btn' onClick={inputNum}>.</div>
        <div className='btn' onClick={equals}>=</div>
      </div>
    </div>
  )
}
