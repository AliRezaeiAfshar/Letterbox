const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your-secret-key';

const authenticateToken = (req, res, next) => {
    const token = req.cookies.authToken; // Read token from cookies
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports = authenticateToken;