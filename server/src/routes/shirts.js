const express = require('express');
const ShirtsRepo = require('../repos/shirts-repos');

const router = express.Router();

// Get all shirts
router.get('/api/shirts', async (req, res) => {
  try {
    const shirts = await ShirtsRepo.find();
    res.send(shirts);
  } catch (error) {
    console.error('Error getting shirts:', error.message);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// Get shirt by ID
router.get('/shirts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const shirt = await ShirtsRepo.findById(id);

    if (shirt) {
      res.send(shirt);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error getting shirt by ID:', error.message);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// Add shirt
router.post('/shirts', async (req, res) => {
  try {
    const { des, brand, title } = req.body;
    const shirt = await ShirtsRepo.insert(des, brand, title);
    res.send(shirt);
  } catch (error) {
    console.error('Error adding shirt:', error.message);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// Update shirt
router.put('/shirts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { username, bio } = req.body;

    const updatedCar = await ShirtsRepo.update(id, username, bio);

    if (updatedCar) {
      res.send(updatedCar);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error updating shirt:', error.message);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// Delete shirt
router.delete('/shirts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCar = await ShirtsRepo.delete(id);

    if (deletedCar) {
      res.send(deletedCar);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error deleting shirt:', error.message);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

module.exports = router;
