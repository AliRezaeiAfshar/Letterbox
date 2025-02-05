const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { Movie, User, Review, Comment } = require('../models/associations');

// Get all movies
router.get('/', auth, async (req, res) => {
    try {
      
      const movies = await Movie.findAll({
        include: [
          {
            model: Review,
            as: 'Reviews', // must match the alias in your association
            include: [{ model: User, as: 'User', attributes: ['username'] }]
          },
          {
            model: Comment,
            as: 'Comments', // must match the alias in your association
            include: [{ model: User, as: 'User', attributes: ['username'] }]
          }
        ]
      });
      res.render("movies", {movies});
    } catch (err) {
      console.error('Error fetching movies:', err);
      res.status(500).json({ success: false, message: 'An error occurred while fetching movies' });
    }
  });

module.exports = router;