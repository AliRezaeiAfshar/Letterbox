const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Movie = require('../models/Movie');
const User = require('../models/User');
const Review = require('../models/Review');
const Comment = require('../models/Comment');
const auth = require('../middlewares/auth');
const Friend = require('../models/Friend');
const { message } = require('statuses');

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

router.post('/change', auth, async (req, res) => {
    try {
        
        const token = req.cookies.authToken;
        
        if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findByPk(decoded.userId);
        if (!user) return res.status(401).json({ success: false, message: 'Invalid user' });

        const changed = await User.update({
            username: req.body['newUsername'],
            email: req.body['newEmail'],
        },
        {
            where: { user_id: user.user_id } // Ensure only the authenticated user's data is updated
        }
    );

        res.json({ success: true, changed });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'An error occurred' });
    }
});

router.post('/add-friend', auth, async (req, res) => {
    try {
        
        const token = req.cookies.authToken;
        
        if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findByPk(decoded.userId);
        if (!user) return res.status(401).json({ success: false, message: 'Invalid user' });

        const user2 = await User.findOne({ where: { username: req.body['friendUsername'] } });
        const user2_id = user2.user_id;
        console.log(user2_id + " and " + user.user_id);
        const newFriend = await Friend.create({
            user_id1: user.user_id,
            user_id2: user2_id,
        }
    );

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "User doesn't exists or already is a friend!" });
    }
});

router.post('/delete-friend', auth, async (req, res) => {
    try {
        
        const token = req.cookies.authToken;
        
        if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findByPk(decoded.userId);
        if (!user) return res.status(401).json({ success: false, message: 'Invalid user' });

        const user2 = await User.findOne({ where: { username: req.body['friendUsername'] } });
        const user2_id = user2.user_id;

        const newFriend = await Friend.destroy({
            where: { 
                user_id1: user.user_id,
                user_id2: user2_id,
             }
        }
    );

        res.json({ success: true, newFriend });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'An error occurred' });
    }
});

router.get('/friends', async (req, res) => {
    try {
        const token = req.cookies.authToken;
        
        if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findByPk(decoded.userId);
        if (!user) return res.status(401).json({ success: false, message: 'Invalid user' });


        const userr = await User.findByPk(user.user_id, {
            include: [
                { model: User, as: 'Friendships', attributes: ['user_id', 'username'] },
                { model: User, as: 'FriendOf', attributes: ['user_id', 'username'] }
            ]
        });
        
        const allFriends = [...userr.Friendships, ...userr.FriendOf];

        res.json({ success: true, allFriends });
    } catch (error) {
        console.error('Error fetching friends:', error);
        res.status(500).json({ success: false, message: 'Error fetching friends' });
    }
});


module.exports = router;