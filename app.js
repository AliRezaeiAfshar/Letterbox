const express = require('express');
const path = require('path');
const authRouter = require('./routes/auth');
const moviesRouter = require('./routes/movies');
const apiRouter = require('./routes/api');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/user');

const app = express();

// Use cookie-parser middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  const token = req.cookies.authToken;
  if (token) {
    next();
  } else {
    // If no token is found, redirect the user to the login page
    res.redirect('/auth/login');
  }
}

// Root route: redirect to dashboard if logged in; otherwise, redirect to login page
app.get('/', (req, res) => {
<<<<<<< HEAD
  res.render("login")
=======
  const token = req.cookies.authToken;
  if (token) {
    res.redirect('/dashboard');
  } else {
    res.redirect('/auth/login');
  }
>>>>>>> 5c6c38036baec1e862e043bc914d9d947678a301
});

// Protected route: dashboard (only accessible if logged in)
app.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard', { token: req.cookies.authToken });
});

// Protected route: admin (only accessible if logged in)
app.get('/admin', isAuthenticated, (req, res) => {
  res.render('admin', { token: req.cookies.authToken });
});

// Use other routers
app.use('/movies', moviesRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/api', apiRouter);

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
