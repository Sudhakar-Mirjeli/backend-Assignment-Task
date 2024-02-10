const router = require('express').Router();
const Authmiddleware = require('../utilities/authmiddleware');
const BookController = require('./../controllers/bookController');
const BookMiddleware = require('../middleware/bookMiddleware');


// Get all Books route
router.get('/',
    (req, res, next) => Authmiddleware.authenticate(req, res, next),
    (req, res) => BookController.fetchAllBooks(req, res));


// Adding a new book route
router.post('/',
    (req, res, next) => BookMiddleware.prepareAddNewBookRequest(req, res, next),
    (req, res) => BookController.addNewBook(req, res));


// Get book by id route
router.get('/:bookId',
    (req, res, next) => Authmiddleware.authenticate(req, res, next),
    (req, res, next) => BookMiddleware.prepareBookIdRequest(req, res, next),
    (req, res) => BookController.fetchBookById(req, res));


// Update book route
router.put('/:bookId',
    (req, res, next) => Authmiddleware.authenticate(req, res, next),
    (req, res, next) => BookMiddleware.prepareBookIdRequest(req, res, next),
    (req, res) => BookController.updateBook(req, res));


// Delete book route
router.delete('/:bookId',
    (req, res, next) => Authmiddleware.authenticate(req, res, next),
    (req, res, next) => BookMiddleware.prepareBookIdRequest(req, res, next),
    (req, res) => BookController.removeBook(req, res));

module.exports = router;