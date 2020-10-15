const express = require("express");
const router = express.Router();
const Roast = require("../../models/Roast");

// get all roasts
router.get('/', (req, res) => {
  Roast.find()
  .then(roasts => res.json(roasts))
  .catch(err => res.json(err))
})

// get all roasts from user
router.get('/user/:user', (req, res) => {
    Roast.find({user: req.params.user})
    .sort({date: -1})
    .then(batch => res.json(batch))
    .catch(err => res.json(err))
});

// get one roast
router.get('/id/:id', (req, res) => {
    Roast.findById(req.params.id)
    .then(batch => res.json(batch))
    .catch(err => res.json(err))
});

// add a roast to history
router.post('/', (req, res) => {
  console.log(req.body)
  Roast.create(req.body)
  .then((roasts => res.json(roasts)))
  .catch(err => res.json(err))
});

// update a roast's notes
router.put('/:id', (req, res) => {
  console.log(req.params.id)
  console.log(req.body)
  Roast.findByIdAndUpdate({ _id: req.params.id }, req.body)
  .then(roast => res.json(roast))
  .catch(err => res.status(422).json(err))
})

// delete a roast by id
router.delete('/:id', (req, res) => {
  Roast.findByIdAndRemove(req.params.id).then((coffee) => {
    coffee.roasts.id(req.params.id).remove()
    return coffee.save()
  }).then((inv) => {
    res.json(inv)
  })
});

module.exports = router;