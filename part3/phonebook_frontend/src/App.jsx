import { useState, useEffect} from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/Persons'

const App = ({ }) => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [persons])

  const handleNewName   = (event) => setNewName(event.target.value)
  const handleNewNumber = (event) => setNewNumber(event.target.value)
  const handleNewFilter = (event) => setNewFilter(event.target.value)

  const succeeded = (name) => {
    setSuccessMessage(
      `Added ${name}`
    )
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }
  
  const addContact = (event) => {
    event.preventDefault()
    const match = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    if (match){
      if(window.confirm(newName + " is already added to phonebook, replace the old number with a new one?")){
      personService
        .update(match.id, {...match, number: newNumber})
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== match.id ? person : returnedPerson))
          succeeded(newName)
        })
        .catch(error => handleError(error)
      )
        setNewName('')
        setNewNumber('')
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
          succeeded(newName)
        })
        .catch(error => handleError(error)
      )
      setNewName('')
      setNewNumber('')
    }
  }

  const handleError = (error) => {
    if(error.response){
      setErrorMessage(error.response.data.error);
    } else if (error.request){
      setErrorMessage(`Error connecting to server: ${error.message}`)
    } else {
      setErrorMessage(`Unknown error ${error.message}`)
    } 
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const handleRemove = (name, id) => {
    if (window.confirm('Delete ' + name + '?')){
      personService
      .remove(id)
      .then(setPersons(persons.filter(person => person.id !== id)))
      .catch(error => {})
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
      <Notification message={errorMessage} isError={true}/>
      <Notification message={successMessage} isError={false} />
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