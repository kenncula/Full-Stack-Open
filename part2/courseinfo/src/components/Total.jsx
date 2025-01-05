const Total = ({ course }) => {
    const exs = course.parts.map(part => part.exercises)
    const sum = exs.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    return (
      <p>
        <strong> Number of exercises {sum} </strong>
      </p>
    )
  }

  export default Total