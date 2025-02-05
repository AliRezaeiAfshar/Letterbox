const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const pool = require('../config/database'); // Your database connection

// Get all movies
router.get('/', auth, async (req, res) => {
    try {

        res.render("profile");
    } catch (error) {

    }
});

module.exports = router;