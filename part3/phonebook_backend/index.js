require('dotenv').config()
const express = require('express')
// const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

// morgan.token('post-body', (req, res)=>{
//   if (req.method == 'POST') {
//     return JSON.stringify(req.body)
//   }
//   return null
// })

// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-body'));

const BASE_URL = '/api/persons'

app.get(BASE_URL, (request, response, next) => {
  Person.find({}).then(person => {
    response.json(person)
  })
    .catch(error => next(error))
})

app.get(BASE_URL+'/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if(person){
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
  Person.countDocuments({})
    .then(count => {
      const info = `<p> Phonebook has info for ${count} people <br/> ${new Date()} </p>`
      response.send(info)
    })
    .catch(error => next(error))
})

app.put(BASE_URL+'/:id', (request, response, next) => {
  const { name, number } = request.body
  Person.findByIdAndUpdate(request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.post(BASE_URL, (request, response, next) => {
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
  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error => next(error))
})

app.delete(BASE_URL+'/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
