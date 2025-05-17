const express = require('express');
const router = express.Router();
const Rating = require('../models/Rating');

// Get all ratings
router.get('/', async (req, res) => {
  try {
    const ratings = await Rating.find();
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ratings' });
  }
});

// Get a single rating by ID
router.get('/:id', async (req, res) => {
  try {
    const rating = await Rating.findById(req.params.id);
    if (!rating) {
      return res.status(404).json({ message: 'Rating not found' });
    }
    res.json(rating);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rating' });
  }
});

// Create a new rating
router.post('/', async (req, res) => {
  try {
    const { userid, productid, star, description } = req.body;
    const rating = new Rating({
      userid,
      productid,
      star,
      description
    });
    await rating.save();
    res.status(201).json(rating);
  } catch (error) {
    res.status(400).json({ message: 'Error creating rating' });
  }
});

// Update a rating (full update)
router.put('/:id', async (req, res) => {
  try {
    const { userid, productid, star, description } = req.body;
    const rating = await Rating.findByIdAndUpdate(
      req.params.id,
      { userid, productid, star, description },
      { new: true }
    );
    if (!rating) {
      return res.status(404).json({ message: 'Rating not found' });
    }
    res.json(rating);
  } catch (error) {
    res.status(400).json({ message: 'Error updating rating' });
  }
});
{/*
// Update a rating (partial update)
router.patch('/:id', async (req, res) => {
  try {
     const rating = await Rating.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!rating) {
      return res.status(404).json({ message: 'Rating not found' });
    }
    res.json(rating);
  } catch (error) {
    res.status(400).json({ message: 'Error updating rating' });
  }
});*/}
router.patch('/:id', async (req, res) => {
  try {
    const { userid, productid, star, description } = req.body;
    const rating = await Rating.findByIdAndUpdate(
      req.params.id,
      { userid, productid, star, description },
      { new: true }
    );
    if (!rating) {
      return res.status(404).json({ message: 'Rating not found' });
    }
    res.json(rating);
  } catch (error) {
    res.status(400).json({ message: 'Error updating rating' });
  }
});


// Delete a rating
router.delete('/:id', async (req, res) => {
  try {
    const rating = await Rating.findByIdAndDelete(req.params.id);
    if (!rating) {
      return res.status(404).json({ message: 'Rating not found' });
    }
    res.json({ message: 'Rating deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting rating' });
  }
});

module.exports = router;