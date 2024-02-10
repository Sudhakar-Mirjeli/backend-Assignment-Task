const mongoose = require('mongoose');
const Joi = require('joi');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String
    }
}, { timeStamps: true })

const BookModel = mongoose.model('books', bookSchema);

// book schema validator.
const bookSchemaValidator = Joi.object({
    name: Joi.string().required(),
    description: Joi.string()
})

// book Id validator.
const bookIdValidator = Joi.object({
    bookId: Joi.string().trim().regex(/^[0-9a-fA-F]{24}$/).required()
})

module.exports = {
    BookModel,
    bookSchemaValidator,
    bookIdValidator
}