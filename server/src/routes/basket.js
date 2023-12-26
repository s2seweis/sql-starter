const express = require('express');
const BasketRepo = require('../repos/basket-repos');

const router = express.Router();

// Get all basket
router.get('/basket', async (req, res) => {
  try {
    const basket = await BasketRepo.find();
    console.log("line:500", basket);

    res.send(basket);
  } catch (error) {
    console.error('Error getting basket:', error.message);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// Get basket by ID
router.get('/basket/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log("line:100", id);
    const basket = await BasketRepo.findById(id);

    if (basket) {
      res.send(basket);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error getting basket by ID:', error.message);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// Add basket
router.post('/basket', async (req, res) => {
    try {
      const { user_id, productid, productname, price, category, quantity } = req.body;
      console.log("line:1", user_id);
      console.log("line:2", productid);
      console.log("line:3", productname);
      console.log("line:4", price);
      console.log("line:5", category);
      console.log("line:6", quantity);
  
      // Assuming BasketRepo.insert takes an object representing basket properties
      const basket = await BasketRepo.insert({ user_id, productid, productname, price, category, quantity });
  
      res.send(basket);
    } catch (error) {
      console.error('Error adding basket:', error.message);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });

// Update basket
router.put('/basket/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log("line:1", id);
    const { user_id, bio, date_of_birth, location, website_url, profile_picture_url } = req.body;

    const updatedProfile = await BasketRepo.update(user_id, bio, date_of_birth, location, website_url, profile_picture_url);

    if (updatedProfile) {
      res.send(updatedProfile);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error updating basket:', error.message);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// Delete basket
router.delete('/basket/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProfile = await BasketRepo.delete(id);

    if (deletedProfile) {
      res.send(deletedProfile);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error deleting basket:', error.message);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

module.exports = router;
