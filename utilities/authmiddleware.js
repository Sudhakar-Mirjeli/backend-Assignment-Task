const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/userModel');
const HTTP_STATUS = require('../constants/http-status');
const config = require('../config')

// Authenticating the User
async function authenticate(req, res, next) {
    try {
        const tokenHeader = req.headers.authorization;
        if (!tokenHeader) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Authentication token is missing..' });
        }
        let token = await tokenHeader.split(' ');

        const decoded = jwt.verify(token[1], config.SERVER.JWT_SECRET_KEY);
        const user = await UserModel.findById(decoded._id);
        if (!user) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Invalid token or user not found.' });
        }
        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token or authentication failed.', error: error.message });
    }
};

module.exports = { authenticate } 
