const express = require('express');
const CarsRepo = require('../repos/cars-repos');

const router = express.Router();

// Get all cars
router.get('/api/cars', async (req, res) => {
  try {
    const cars = await CarsRepo.find();
    res.send(cars);
  } catch (error) {
    console.error('Error getting cars:', error.message);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// Get car by ID
router.get('/cars/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const car = await CarsRepo.findById(id);

    if (car) {
      res.send(car);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error getting car by ID:', error.message);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// Add car
router.post('/cars', async (req, res) => {
  try {
    const { username, bio } = req.body;
    const car = await CarsRepo.insert(username, bio);
    res.send(car);
  } catch (error) {
    console.error('Error adding car:', error.message);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// Update car
router.put('/cars/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { username, bio } = req.body;

    const updatedCar = await CarsRepo.update(id, username, bio);

    if (updatedCar) {
      res.send(updatedCar);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error updating car:', error.message);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// Delete car
router.delete('/cars/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCar = await CarsRepo.delete(id);

    if (deletedCar) {
      res.send(deletedCar);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error deleting car:', error.message);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

module.exports = router;
