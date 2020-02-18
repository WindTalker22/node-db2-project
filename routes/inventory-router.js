const express = require('express')

const db = require('../data/dbConfig')

const router = express.Router()

// READ all
router.get('/', (req, res) => {
  db('cars')
    .then(cars => {
      res.json(cars)
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to retrieve inventory' })
    })
})

// READ individually by specific ID
router.get('/:id', (req, res) => {
  // a car by it's Id
  // select * from cars where id = :id
  // const {id} = req.params.id
  db('cars')
    .where({ id: req.params.id })
    .first() // grab the first item on the return array
    .then(car => {
      car
        ? res.status(200).json(car)
        : res.status(404).json({ errorMessage: 'No car exists with that ID' })
    })
    .catch(error => {
      console.log(error)
      res
        .status(500)
        .json({ error: 'Failed to retrieve the car with that ID ' })
    })
})

// CREATE new car
router.post('/', (req, res) => {
  // add car
  // insert into cars () values ()
  db('cars')
    .insert(req.body, 'id') // will generate a warning in console when using sqlite, ignore that
    .then(car => {
      res.status(201).json(car)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ error: 'Failed to add car to inventory' })
    })
})

// UPDATE existing car
router.put('/:id', (req, res) => {
  // update cars
  // const {id} = req.params
  // const changes = req.body

  db('cars')
    .where({ id: req.params.id }) //
    .update(req.body)
    .then(updated => {
      res.status(201).json(updated)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ error: 'Failed to update vehicle information' })
    })
})

// DELETE existing car by ID
router.delete('/:id', (req, res) => {
  // delete car
  // destructure id from req.params
  const { id } = req.params
  // const changes = req.body
  db('cars')
    .where({ id }) // remember to filter or all records will be deleted
    .delete()
    .then(car => {
      res.status(201).json(car)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ error: 'Failed to remove vehicle from inventory' })
    })
})
module.exports = router
