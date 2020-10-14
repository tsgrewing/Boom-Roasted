const express = require("express");
const router = express.Router();
const Coffee = require("../../models/Coffee");

// get all coffees
router.get('/', (req, res) => {
  Coffee.find()
  .then(coffees => res.json(coffees))
  .catch(err => res.json(err))
})

// get all coffees from user
router.get('/:user', (req, res) => {
  Coffee.find({user: req.params.user})
  .then(coffees => res.json(coffees))
  .catch(err => res.json(err))
})

// add a coffee to inventory
router.post('/', (req, res) => {
  Coffee.create(req.body)
  .then((coffees => res.json(coffees)))
  .catch(err => res.send(err))
});

// update a coffee's weight in inventory
router.put('/:id', (req, res) => {
  Coffee.findByIdAndUpdate({ _id: req.params.id }, req.body)
  .then(coffee => res.json(coffee))
  .catch(err => res.status(422).json(err))
})

// delete a coffee by id
router.delete('/:id', (req, res) => {
  Coffee.findByIdAndRemove(req.params.id).then((coffee) => {
    coffee.coffees.id(req.params.id).remove()
    return coffee.save()
  }).then((inv) => {
    res.json(inv)
  })
});

module.exports = router;