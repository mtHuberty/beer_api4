const express = require('express')
const mongoose = require('mongoose')
const Beer = require('./models/beer')

const app = express()

app.use(express.urlencoded({ extended: true }))

app.get('/hello', (req, res) => {
  console.log('Got a request!!');
  res.send('<h1>Hello!!!</h1>')
})

app.get('/beers', (req, res) => {
  Beer.find((err, beers) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.json(beers)
    }
  })
})

app.get('/beers/:beer_id', (req, res) => {
  Beer.findById(req.params.beer_id, (err, beer) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.json(beer)
    }
  })
})

app.put('/beers/:beer_id', (req, res) => {
  Beer.findById(req.params.beer_id, (err, beer) => {
    if (err) {
      res.status(500).send(err)
    } else {
      beer.name = req.body.name
      beer.rating = req.body.rating

      beer.save((err, beer) => {
        if (err) {
          res.status(500).send(err)
        } else {
          res.send(`Beer posted!\n${beer}`)
        }
      })
    }
  })
})



app.post('/beers', (req, res) => {
  let beer = new Beer()
  beer.name = req.body.name
  beer.rating = req.body.rating
  beer.save((err, beer) => {
    if (err) {
      res.status(500)
      res.send(err)
    } else {
      res.send(`Saved your ${beer}`)
    }
  })
})

app.delete('/beers/:beer_id', (req, res) => {
  // Beer.findByIdAndDelete()
  Beer.deleteOne({
    _id: req.params.beer_id
  }, err => {
    if (err) {
      res.status(400).send(err)
    } else {
      res.send(`Successfully delete beer with id: ${req.params.beer_id}`)
    }
  })
})

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