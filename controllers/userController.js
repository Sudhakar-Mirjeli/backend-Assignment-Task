const UserService = require('../services/userService')
const HTTP_STATUS = require('../constants/http-status')
const logger = require('../utilities/logger');

/**
 * @method BookController:addNewUser
 * @description Adds a new user
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @returns Returns a successful response after adding user 
*/
async function addNewUser(req, res) {
    try {
        logger.info('Inside BookController: addNewUser method')
        if (!req.body) throw new Error('please provide required data.')
        const response = await UserService.addNewUser(req.body)
        if (!response)
            throw new Error('Error! Please try after some time.')
        return res.status(HTTP_STATUS.CREATED).json(response);
    } catch (error) {
        logger.error(`Inside BookController: addNewUser method: Error while adding new user, ${error}`);
    };
}

module.exports = {
    addNewUser
}