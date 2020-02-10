const express = require('express')
const beerRouter = express.Router()
const Beer = require('../models/beer')

beerRouter.get('/', (req, res) => {
  Beer.find((err, beers) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.json(beers)
    }
  })
})

beerRouter.get('/:beer_id', (req, res) => {
  Beer.findById(req.params.beer_id, (err, beer) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.json(beer)
    }
  })
})

beerRouter.put('/:beer_id', (req, res) => {
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

beerRouter.post('/', (req, res) => {
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

beerRouter.delete('/:beer_id', (req, res) => {
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


module.exports = beerRouter