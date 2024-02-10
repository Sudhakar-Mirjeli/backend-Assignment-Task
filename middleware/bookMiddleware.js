const HTTP_STATUS = require('./../constants/http-status')
const { bookSchemaValidator, bookIdValidator, } = require('../models/booksModel');
const logger = require('../utilities/logger')


/**
 * @method BookMiddleware:prepareAddNewBookRequest
 * @description validates the input and pass the validated object
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function prepareAddNewBookRequest(req, res, next) {
    try {
        logger.info('Inside BookMiddleware: prepareAddNewBookRequest method');
        if (req.body) {
            const bookInputValidation = await bookSchemaValidator.validateAsync(req.body);
            req.body = bookInputValidation;
        }
        next();
    } catch (error) {
        logger.error(`Inside BookMiddleware: prepareAddNewBookRequest method:  Error occurred at validating schema: ', ${error}`);
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            status: false,
            message: 'Please provide required data.'
        });
    }
}

/**
 * @method BookMiddleware:prepareBookIdRequest
 * @description validates the input and pass the validated object
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function prepareBookIdRequest(req, res, next) {
    try {
        logger.info('Inside BookMiddleware: prepareBookIdRequest method');

        if (req.params.bookId) {
            const bookIdValidation = await bookIdValidator.validateAsync({ bookId: req.params.bookId });
            req.validate = bookIdValidation;
        }
        next();
    }
    catch (error) {
        logger.error(`Inside BookMiddleware: prepareBookIdRequest method:  Error occurred at validating book id: ', ${error}`);
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            status: false,
            message: 'Please provide required data.'
        });
    }
}

module.exports = {
    prepareAddNewBookRequest,
    prepareBookIdRequest
}