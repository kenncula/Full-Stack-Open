import { useState, useEffect} from 'react'
import axios from 'axios'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/Persons'

const App = ({ }) => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNewName   = (event) => setNewName(event.target.value)
  const handleNewNumber = (event) => setNewNumber(event.target.value)
  const handleNewFilter = (event) => setNewFilter(event.target.value)

  const addContact = (event) => {
    event.preventDefault()
    const match = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    if (typeof match !== 'undefined'){
      if(window.confirm(newName + " is already added to phonebook, replace the old number with a new one?")){
      personService
        .update(match.id, {...match, number: newNumber})
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== match.id ? person : returnedPerson))
        })
        }
    }
    else{
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
      setNewName('')
      setNewNumber('')
    }
  }

  const handleRemove = (name, id) => {
    if (window.confirm('Delete ' + name + '?')){
      personService
      .remove(id)
      .then(setPersons(persons.filter(person => person.id !== id)))
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
        <Person key={person.name} name={person.name} number={person.number} handleRemove={() => handleRemove(person.name, person.id)} />
        )}
      </ul>
    </div>
  )
}

export default App