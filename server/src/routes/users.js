const express = require('express');
const UserRepo = require('../repos/users-repos');

const router = express.Router();

// ### Get Users - works

router.get('/users', async (req, res) => {
  // Run a query to get all users
  const users = await UserRepo.find();

  // Send the result back to the person
  // who made this request
  res.send(users);
});

// ### Get Users by Id - works

router.get('/users/:user_id', async (req, res) => {

  const { user_id } = req.params;

  const user = await UserRepo.findById(user_id);

  if (user) {
    res.send(user);
  } else {
    res.sendStatus
  }

});

// ### Add Users - works

router.post('/users', async (req, res) => {

  console.log('Received form data:', req.body);

  const { username, email, full_name, profile_picture_url} = req.body;
  const user = await UserRepo.insert(username, email, full_name, profile_picture_url);

  res.send(user);
});

// ### Update Users - works

router.put('/users/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;
    const { username, email, full_name, profile_picture_url } = req.body;

    const user = await UserRepo.update(user_id, username, email, full_name, profile_picture_url);

    if (user) {
      res.send(user);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// ### Delete Users - works

router.delete('/users/:user_id', async (req, res) => {
  const { user_id } = req.params;
  console.log("line:500", user_id);
  const user = await UserRepo.delete(user_id);

  if (user) {
    res.send(user);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
