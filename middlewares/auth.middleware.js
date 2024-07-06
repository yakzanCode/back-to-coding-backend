const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user.model.js');

const isAuthenticated = async (req, res, next) => {
    // Get the token from the request headers
    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch the user from the database
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Attach the user object to the request for further use
        req.user = { userId: user._id };

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error in isAuthenticated middleware:', error);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = {
    isAuthenticated
};
