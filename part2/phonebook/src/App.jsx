import { useState, useEffect} from 'react'
import axios from 'axios'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = ({ }) => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNewName   = (event) => setNewName(event.target.value)
  const handleNewNumber = (event) => setNewNumber(event.target.value)
  const handleNewFilter = (event) => setNewFilter(event.target.value)

  const addContact = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name.toLowerCase())
    const numbers = persons.map(person => person.number)

    if (names.includes(newName.toLowerCase()) || numbers.includes(newNumber)){
      alert(`${newName} or ${newNumber} is already added to phonebook`)
    }
    else{
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName('')
      setNewNumber('')
    }
  }

  const filteredPersons = (newFilter === '')
    ? persons 
    : (persons.filter((person) => 
      person.name.toLowerCase().includes(newFilter.toLowerCase()) 
      ? person 
      : null))

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={newFilter} filterChange={handleNewFilter}/>

      <h2>Add a new</h2>
      <PersonForm 
        name = {newName} 
        number={newNumber} 
        onSubmit={addContact} 
        nameChange={handleNewName} 
        numberChange={handleNewNumber}
      />

      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map(person => 
          <Person key={person.name} name={person.name} number={person.number} />
        )}
      </ul>
    </div>
  )
}

export default App