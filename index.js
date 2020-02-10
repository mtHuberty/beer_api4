const express = require('express')
const mongoose = require('mongoose')
const beerRouter = require('./routes/beerRouter')

const app = express()

app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/beers', beerRouter)

mongoose.connect('mongodb://localhost:27017/beers', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // dbName: 'beers'
})
mongoose.connection.on('connected', () => {
  console.log('Connected to beers database')
  app.listen(4444, () => {
    console.log('Listening on port 4444...')
  })
})
mongoose.connection.on('error', () => {
  console.log('Error connecting to beers database :(')
  process.exit(1)
})