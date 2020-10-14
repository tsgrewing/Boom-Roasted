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
  console.log(req.params.id)
  console.log(req.body)
  Coffee.findByIdAndUpdate({ _id: req.params.id }, req.body)
  .then(roast => res.json(roast))
  .catch(err => res.json(err))
})

// delete a coffee by id
router.delete('/:id', (req, res) => {
  Coffee.findByIdAndRemove(req.params.id, function (err, docs) { 
    if (err){ 
        console.log(err) 
    } 
    else{ 
        console.log("Removed coffee : ", docs); 
    } 
});
});

module.exports = router;