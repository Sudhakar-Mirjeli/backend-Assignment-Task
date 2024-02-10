const router = require('express').Router();
const UserController = require('./../controllers/userController');


// Adding a new user route
router.post('/',
    (req, res) => UserController.addNewUser(req, res));

module.exports = router;