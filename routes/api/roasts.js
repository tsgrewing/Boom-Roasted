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
router.get('/:user', (req, res) => {
    Roast.find({user: req.params.user})
    .then(batch => res.json(batch))
    .catch(err => res.json(err))
});

// get one roast
router.get('/:id', (req, res) => {
    Roast.findById(req.params.id)
    .then(batch => res.json(batch))
    .catch(err => res.json(err))
});

// add a roast to history
router.post('/', (req, res) => {
  Roast.create(req.body)
  .then((roasts => res.json(roasts)))
  .catch(err => res.json(err))
});

// update a roast's notes
router.put('/:id', (req, res) => {
  Roast.findOneAndUpdate({ _id: req.body.id }, req.body)
  .then()
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