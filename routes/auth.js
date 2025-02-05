const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../config/database');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middlewares/auth');
const JWT_SECRET = 'your-secret-key';
const User = require('../models/User');

// Show login page
router.get('/login', (req, res) => {
    res.render('login');
});

// Show signup page
router.get('/signup', (req, res) => {
    res.render('signup');
});

// Handle login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login attempt:', { email, password });

        // Check if user exists
        const [users] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
        
        if (users.length === 0) {
            return res.status(401).json({ success: false, error: 'Invalid email or password' });
        }

        const user = users[0];
        const token = jwt.sign(
            { 
                userId: user._id,
                email: user.email
            },
            JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hours
        );

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', isMatch);

        console.log('Token generated:', token);
        
        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Invalid email or password' });
        }

        res.cookie('authToken', token, { httpOnly: true, secure: true });
        
        // Redirect to home page
        
        if (user.is_admin === 1) {
            res.json({
                success: true,
                redirectUrl: '/admin',
                user: {
                    id: user._id,
                    email: user.email,
                    username: user.username
                }
            });
        } else {
            res.json({
                success: true,
                redirectUrl: '/dashboard',
                user: {
                    id: user._id,
                    email: user.email,
                    username: user.username
                }
            });
        }

    } catch (error) {
        console.error(error);
        res.render('login', { error: 'An error occurred' });
    }
});

// Handle signup
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log('Request body:', req.body);

        // Check if user already exists
        const [existingUsers] = await db.query(
            'SELECT * FROM user WHERE email = ? OR username = ?',
            [email, username]
        );

        if (existingUsers.length > 0) {
            return res.render('signup', { error: 'Username or email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user
        (async () => {
            const newUser = await User.create({
                username: username,
                email: email,
                password: hashedPassword,
                is_admin: false,
            });
            console.log('User created:', newUser.toJSON());
        })();

        res.redirect('/auth/login');

    } catch (error) {
        console.error(error);
        res.render('signup', { error: 'An error occurred' });
    }
});

router.get('/auth/checktoken', authenticateToken, async (req, res) => {
    res.render("signup");
});

// Handle logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login');
});

module.exports = router;