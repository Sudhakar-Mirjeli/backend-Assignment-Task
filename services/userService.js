const { UserModel } = require('../models/userModel');
const logger = require('../utilities/logger');
const config = require('../config');
const jwt = require('jsonwebtoken');


/**
 * @method UserService:addNewUser
 * @description Adds a new book
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @returns Returns a successful response after adding Book 
*/
async function addNewUser(userRQ) {
    try {
        logger.info('Inside UserService: addNewUser method')

        // Check if the Book is already exists
        const isUserExist = await UserModel.findOne({ email: userRQ.email.toLowerCase() })

        if (isUserExist) {
            return { status: false, message: 'User is already exists.' };
        }
        // Create a new Book 
        const newUser= new UserModel({
            name: userRQ.name,
            email:userRQ.email,
            password: userRQ.password,
        });
        const user = await newUser.save();

        const payload = {
            _id: user._id,
            userName: user.userName,
            email: user.email
        };

        const token = jwt.sign(payload, config.SERVER.JWT_SECRET_KEY, { expiresIn: '1d' });
        return {
            status: true,
            token:token,
            message: 'User added successfully.'
        };

    } catch (error) {
        logger.error(`Inside UserService: addNewUser method: ${error}`)
        return { success: false, message: 'An error occurred during adding new user data.', error: error.message };
    }
}

module.exports = {
    addNewUser
}