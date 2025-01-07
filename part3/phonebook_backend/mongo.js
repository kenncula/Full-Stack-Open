const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Arguments must be off the form: password, [name, number]')
  process.exit(1)
}

const password = process.argv[2]

const url =
`mongodb+srv://kenncula:${password}@cluster-0.c2a1k.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=cluster-0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 3) {
    Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}


if(process.argv.length === 5) {
    const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
    })


    person.save().then(result => {
        console.log(`${process.argv[3]} saved to phonebook`)
        mongoose.connection.close()
    })
}



