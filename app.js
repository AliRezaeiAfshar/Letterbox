const express = require('express');
const path = require('path');
const authRouter = require('./routes/auth');
const moviesRouter = require('./routes/movies');
const cookieParser = require('cookie-parser');

// Next initialize the application
const app = express();

// Use cookie-parser middleware
app.use(cookieParser());
app.use(express.json());

// Middleware for parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

// routing path
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/dashboard', (req, res) => {
  const token = req.cookies.authToken; // Read the token from cookies
  if (!token) {
    return res.status(401).send('Unauthorized: No token provided');
  }
  res.render('dashboard', { token });
});
app.use('/movies', moviesRouter);
// Add this line with your other route uses
app.use('/auth', authRouter);

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});