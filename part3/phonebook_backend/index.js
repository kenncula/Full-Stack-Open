const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

morgan.token('post-body', (req, res)=>{ 
  if (req.method == 'POST') {
    return JSON.stringify(req.body)
  }
  return null
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-body'));

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const BASE_URL = '/api/persons'

app.get("/", (request, response) => {
    response.send("<h1>Hello World!</h1>")
    })

app.get('/api/persons', (request, response) => {
  response.json(persons)
  })

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).send("Person not in phonebook").end()
      }
  })

app.get('/info', (request, response) => {
    const info = `<p> Phonebook has info for ${persons.length} people <br/> ${new Date()} </p>` 
    response.send(info).end()
  })

const generateId = () => {
    const rand = Math.floor(Math.random() * 1000000)
    return String(rand + 1)
  }


app.post(BASE_URL, (request, response) => {
    const body = request.body
  
    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }
    if (!body.number) {
      return response.status(400).json({ 
        error: 'number missing' 
      })
    }
    if (persons.find(person => person.name === body.name)) {
      return response.status(400).json({ 
        error: 'names must be unique' 
      })
    }
  
    const person = {
      id: generateId(),
      name: body.name,
      number: body.number,
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })

app.delete(BASE_URL+'/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})