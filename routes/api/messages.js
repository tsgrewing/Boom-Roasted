const express = require("express");
const router = express.Router();
const Message = require("../../models/Message");

// get all messages
router.get('/', (req, res) => {
  Message.find()
  .then(messages => res.json(messages))
  .catch(err => res.json(err))
})

// add a message to board
router.post('/', (req, res) => {
  Message.create(req.body)
  .then((messages => res.json(messages)))
  .catch(err => res.send(err))
});

// update a message
router.put('/:id', (req, res) => {
  Message.findOneAndUpdate({ _id: req.body.id }, req.body)
  .then()
})

// delete a message by id
router.delete('/:id', (req, res) => {
  Message.findByIdAndRemove(req.params.id).then((message) => {
    message.messages.id(req.params.id).remove()
    return message.save()
  }).then((inv) => {
    res.json(inv)
  })
});

module.exports = router;