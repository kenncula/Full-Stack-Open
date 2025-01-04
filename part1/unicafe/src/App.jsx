import { useState } from 'react'
const Display = ({text}) => <div>{text}</div>
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good+1)} text={'Good'}/>
      <Button handleClick={() => setNeutral(neutral+1)} text={'Neutral'}/>
      <Button handleClick={() => setBad(bad+1)} text={'Bad'}/>
      <h1>Statistics</h1>
      <Display text={`Good: ${good}`}/>
      <Display text={`Neutral: ${neutral}`}/>
      <Display text={`Bad: ${bad}`}/>
    </div>
  )
}

export default App