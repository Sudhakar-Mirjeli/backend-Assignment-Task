const { BookModel } = require('../models/booksModel');
const logger = require('../utilities/logger');


/**
 * @method BookService:addNewBook
 * @description Adds a new book
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @returns Returns a successful response after adding Book 
*/
async function addNewBook(bookRQ) {
    try {
        logger.info('Inside BookService: addNewBook method')

        // Check if the Book is already exists
        const isBookExist = await BookModel.findOne({ name: bookRQ.name.toLowerCase() })

        if (isBookExist) {
            return { status: false, message: 'Book is already exists.' };
        }
        // Create a new Book 
        const newBook = new BookModel({
            name: bookRQ.name,
            description: bookRQ.description,
        });
        await newBook.save();
        return {
            status: true,
            message: 'Book added successfully.'
        };

    } catch (error) {
        logger.error(`Inside BookService: addNewBook method: ${error}`)
        return { success: false, message: 'An error occurred during adding new book data.', error: error.message };
    }
}


/**
 * @method BookService:fetchAllBooks
 * @description fetches all books
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @returns Returns a successful response with the valid data
*/
async function fetchAllBooks() {
    try {
        logger.info('Inside BookService: fetchAllBooks method')
        let allBooks = [];
        allBooks = await BookModel.find({})
        return {
            status: true,
            data: allBooks,
            message: 'Books retrieved successfully.'
        };
    } catch (error) {
        logger.error(`Inside BookService: fetchAllBooks method: ${error}`)
        return { success: false, message: 'An error occurred during retrieving books data.', error: error.message };
    }
}


/**
 * @method BookService:fetchBookById
 * @description fetch single book by id
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @returns Returns a successful response after fetching book
*/
async function fetchBookById(bookId) {
    try {
        logger.info('Inside BookService: fetchBookById method');
        const bookData = await BookModel.findById((bookId));
        return {
            status: true,
            data: bookData,
            message: 'Book retrieved successfully.'
        };
    } catch (error) {
        logger.error(`Inside BookService: fetchBookById method: ${error}`);
        return { success: false, message: 'An error occurred during retrieving book data.', error: error.message };
    }
}


/**
 * @method BookService:updateBook
 * @description update book data
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @returns Returns a successful response after updating book data
*/
async function updateBook(bookRQ, bookId) {
    try {
        logger.info('Inside BookService: updateBook method');
        const isBookUpdated = await BookModel.findByIdAndUpdate((bookId), bookRQ)

        if (isBookUpdated)
            return {
                status: true,
                message: 'Book data updated successfully.'
            };

    } catch (error) {
        logger.error(`Inside BookService: updateBook method: ${error}`)
        return { success: false, message: 'An error occurred during updating book data.', error: error.message };
    }
}

/**
 * @method BookService:removeBook
 * @description deletes book data
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @returns Returns a successful response after deleting books data
*/
async function removeBook(bookId) {
    try {
        logger.info('Inside BookService: removeBook method')
        const isBookExist = await BookModel.findById((bookId))
        if (isBookExist) {
            await BookModel.findByIdAndDelete((bookId))
            return {
                status: true,
                message: 'Book deleted successfully.'
            };
        } else {
            return {
                status: false,
                message: 'Book is not found!'
            };

        }
    } catch (error) {
        logger.error(`Inside BookService: removeBook method: ${error}`)
        return { success: false, message: 'An error occurred during deleting book data.', error: error.message };
    }
}

module.exports = {
    addNewBook,
    fetchAllBooks,
    fetchBookById,
    updateBook,
    removeBook
}