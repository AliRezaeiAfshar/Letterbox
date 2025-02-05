const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Movie = require('../models/Movie');
const User = require('../models/User');
const Review = require('../models/Review');
const Comment = require('../models/Comment');
const auth = require('../middlewares/auth');

router.post('/comments', auth, async (req, res) => {
    try {
        
        const token = req.cookies.authToken;
        
        if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findByPk(decoded.userId);
        if (!user) return res.status(401).json({ success: false, message: 'Invalid user' });

        const movie = await Movie.findOne({ where: { name: req.body.movieName } });
        if (!movie) return res.status(404).json({ success: false, message: 'Movie not found' });

        const comment = await Comment.create({
            userId: user.user_id,
            movieId: movie.movie_id,
            text: req.body.comment
        });

        res.json({ success: true, comment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'An error occurred' });
    }
});

router.post('/reviews', auth, async (req, res) => {
    try {
        const token = req.cookies.authToken;
        if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("the fucking token is: " + token);
        const user = await User.findByPk(decoded.userId);
        console.log("the fucking user is: " + user);
        if (!user) return res.status(401).json({ success: false, message: 'Invalid usersss' });

        const movie = await Movie.findOne({ where: { name: req.body.movieName } });
        if (!movie) return res.status(404).json({ success: false, message: 'Movie not found' });

        const review = await Review.create({
            userId: user.user_id,
            movieId: movie.movie_id,
            rating: req.body.rating,
            text: req.body.review
        });

        res.json({ success: true, review });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'An error occurred' });
    }
});

module.exports = router;