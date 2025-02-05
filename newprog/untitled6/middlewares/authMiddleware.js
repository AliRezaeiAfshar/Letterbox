const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: "No token provided." });
        }

        const token = authHeader.split(" ")[1]; // 'Bearer <token>'
        if (!token) {
            return res.status(401).json({ error: "No token provided." });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid token." });
    }
};

module.exports = authMiddleware;
