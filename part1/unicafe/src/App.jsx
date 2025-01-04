import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if (good+neutral+bad === 0){
    return(
    <p>No feedback given</p>
    )
    }
  else{
    return (
    <>
    <table>
      <StatisticLine text={'Good'} value={good}/>
      <StatisticLine text={'Neutral'} value={neutral}/>
      <StatisticLine text={'Bad'} value={bad}/>
      <StatisticLine text={'all'} value={good+neutral+bad}/>
      <StatisticLine text={'average'} value={((good - bad)/(good+neutral+bad)).toFixed(2)}/>
      <StatisticLine text={'positive'} value={((good)/(good+neutral+bad))*100 + '%'}/> 
    </table>
    </>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setGood(good+1)} text={'Good'}/>
      <Button handleClick={() => setNeutral(neutral+1)} text={'Neutral'}/>
      <Button handleClick={() => setBad(bad+1)} text={'Bad'}/>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App