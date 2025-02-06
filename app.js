const express = require('express');
const path = require('path');
const authRouter = require('./routes/auth');
const moviesRouter = require('./routes/movies');
const apiRouter = require('./routes/api');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/user');
const authenticateToken = require('./middlewares/auth');

const app = express();

// Use cookie-parser middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

// Root route: redirect to dashboard if logged in; otherwise, redirect to login page


// Protected route: dashboard (only accessible if logged in)
app.get('/dashboard', authenticateToken, (req, res) => {
  res.render('dashboard', { token: req.cookies.authToken });
});

// Protected route: admin (only accessible if logged in)
app.get('/admin', authenticateToken, (req, res) => {
  res.render('admin', { token: req.cookies.authToken });
});

// Use other routers
app.use('/movies', moviesRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/api', apiRouter);

app.use('/*', (req, res) => {
  const token = req.cookies.authToken;
  if (token) {
    res.redirect('/user/');
  } else {
    res.redirect('/auth/login');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
