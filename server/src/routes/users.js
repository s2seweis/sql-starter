const express = require('express');
const UserRepo = require('../repos/user-repos');

const router = express.Router();

// ### Get Users 

router.get('/users', async (req, res) => {
  // Run a query to get all users
  const users = await UserRepo.find();

  // Send the result back to the person
  // who made this request
  res.send(users);
});

// ### Get Users by Id

router.get('/users/:id', async (req, res) => {

  const { id } = req.params;

  const user = await UserRepo.findById(id);

  if (user) {
    res.send(user);
  } else {
    res.sendStatus
  }

});

// ### Add Ussers

router.post('/users', async (req, res) => {

  const { username, bio} = req.body;

  const user = await UserRepo.insert(username, bio);

  res.send(user);
});

// ### Update Users

router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { username, bio } = req.body;

  const user = await UserRepo.update(id, username, bio);

  if (user) {
    res.send(user);
  } else {
    res.sendStatus(404);
  }

  res.send(user);
});

// ### Delete Users

router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  const user = await UserRepo.delete(id);

  if (user) {
    res.send(user);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
