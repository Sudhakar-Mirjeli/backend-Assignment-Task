const BookService = require('../services/bookService')
const HTTP_STATUS = require('../constants/http-status')
const logger = require('../utilities/logger');

/**
 * @method BookController:addNewBook
 * @description Adds a new book
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @returns Returns a successful response after adding Book 
*/
async function addNewBook(req, res) {
    try {
        logger.info('Inside BookController: addNewBook method')
        if (!req.body) throw new Error('please provide required data.')
        const response = await BookService.addNewBook(req.body)
        if (!response)
            throw new Error('Error! Please try after some time.')
        return res.status(HTTP_STATUS.CREATED).json(response);
    } catch (error) {
        logger.error(`Inside BookController: addNewBook method: Error while adding new book, ${error}`);
    };
}

/**
 * @method BookController:fetchAllBooks
 * @description fetches all books
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @returns Returns a successful response with the valid data
*/
async function fetchAllBooks(req, res) {
    try {
        logger.info('Inside BookController: fetchAllBooks method')
        const response = await BookService.fetchAllBooks()
        if (!response)
            throw new CustomError('Error! Please try after some time.')
        return res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
        logger.error(`Inside BookController: fetchAllBooks method: Error while fetching books, ${error}`);
    };
}

/**
 * @method BookController:fetchBookById
 * @description fetch  single book by id
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @returns Returns a successful response after fetching book
*/
async function fetchBookById(req, res) {
    try {
        logger.info('Inside BookController: fetchBookById method')
        if (!req.validate.bookId) throw new Error('please provide required data.')
        const response = await BookService.fetchBookById(req.validate.bookId)
        if (!response)
            throw new CustomError('Error! Please try after some time.')
        return res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
        logger.error(`Inside BookController: fetchBookById method: Error while fetching book by id, ${error}`);
    };
}

/**
 * @method BookController:updateBook
 * @description update book data
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @returns Returns a successful response after updating book data
*/
async function updateBook(req, res) {
    try {
        logger.info('Inside BookController: updateBook method')
        if (!req.body && !req.validate.bookId) throw new Error('please provide required data.')
        const response = await BookService.updateBook(req.body, req.validate.bookId)
        if (!response)
            throw new CustomError('Error! Please try after some time.')
        return res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
        logger.error(`Inside BookController: updateBook method: Error while updating book, ${error}`);
    };
}

/**
 * @method BookController:removeBook
 * @description deletes book data
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @returns Returns a successful response after deleting books data
*/
async function removeBook(req, res) {
    try {
        logger.info('Inside BookController: removeBook method')
        if (!req.validate.bookId) throw new Error('please provide required data.')
        const response = await BookService.removeBook(req.validate.bookId)
        if (!response)
            throw new CustomError('Error! Please try after some time.')
        return res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
        logger.error(
            `Inside BookController: removeBook method: Error while updating book, ${error}`
        );
    };
}

module.exports = {
    addNewBook,
    fetchAllBooks,
    fetchBookById,
    updateBook,
    removeBook
}