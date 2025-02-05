const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const pool = require('../config/database'); // Your database connection

// Get all movies
router.get('/', auth, async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT name, creator, date FROM movies ORDER BY date DESC'
        );
        res.render("movies", { movies: rows });
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;