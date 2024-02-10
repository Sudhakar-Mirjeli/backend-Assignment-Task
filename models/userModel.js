const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    }
}, { timeStamps: true })

const UserModel = mongoose.model('users', userSchema);

module.exports = {
    UserModel
}