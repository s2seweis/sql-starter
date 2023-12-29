const express = require('express');
const ProductRepo = require('../repos/products-repos');

const router = express.Router();

// Get all product
router.get('/product', async (req, res) => {
    try {
        const product = await ProductRepo.find();
        // console.log("line:500", product);

        const dateOfBirthArray = product.map(item => item.dateOfBirth);

        res.send(product);
    } catch (error) {
        console.error('Error getting product:', error.message);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

// Get product by ID
router.get('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log("line:1", id);
        const product = await ProductRepo.findById(id);

        if (product) {
            res.send(product);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.error('Error getting product by ID:', error.message);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

// Add product
router.post('/product', async (req, res) => {
    try {
        const {
            ProductName,
            Price,
            Category
        } = req.body;

        // Validate required fields
        if (!ProductName || !Price || !Category) {
            return res.status(400).json({ error: 'Product name, price, and category are required.' });
        }

        // Validate Price is a valid number
        if (isNaN(Price) || parseFloat(Price) <= 0) {
            return res.status(400).json({ error: 'Price must be a valid number greater than zero.' });
        }

        // Other validations can be added as needed

        const product = await ProductRepo.insert(ProductName, Price, Category);
        res.status(201).json(product);
    } catch (error) {
        console.error('Error adding product:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update product
router.put('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log("line:1", id);
        const { user_id, bio, date_of_birth, location, website_url, profile_picture_url } = req.body;

        const updatedProfile = await ProductRepo.update(user_id, bio, date_of_birth, location, website_url, profile_picture_url);

        if (updatedProfile) {
            res.send(updatedProfile);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.error('Error updating product:', error.message);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

// Delete product
router.delete('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProfile = await ProductRepo.delete(id);

        if (deletedProfile) {
            res.send(deletedProfile);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.error('Error deleting product:', error.message);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

module.exports = router;
