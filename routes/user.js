const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Get all movies
router.get('/', async (req, res) => {
    try {
        const token = req.cookies.authToken;
        
        if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findByPk(decoded.userId);
        if (!user) return res.status(401).json({ success: false, message: 'Invalid user' });

        console.log(user);

        res.render("profile", { user });
    } catch (error) {
        console.error(error);
        res.render('login', { error: 'An error occurred' });
    }
});
router.get('/friends', (req, res) => {
    res.render('friends');
});

module.exports = router;