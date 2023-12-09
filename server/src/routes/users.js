const express = require('express');
const UserRepo = require('../repos/user-repos');

const router = express.Router();

// ### Get Users - works

router.get('/users', async (req, res) => {
  // Run a query to get all users
  const users = await UserRepo.find();

  // Send the result back to the person
  // who made this request
  res.send(users);
});

// ### Get Users by Id

router.get('/users/:user_id', async (req, res) => {

  const { user_id } = req.params;

  const user = await UserRepo.findById(user_id);

  if (user) {
    res.send(user);
  } else {
    res.sendStatus
  }

});

// ### Add Ussers - works

router.post('/users', async (req, res) => {

  const { username, email, full_name, profile_picture_url} = req.body;

  const user = await UserRepo.insert(username, email, full_name, profile_picture_url);

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
