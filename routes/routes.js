const router = require('express').Router();
const BookRoutes = require('./bookRoutes');
const UserRoutes = require('./userRoutes')

router.use('/books', BookRoutes)

router.use('/users', UserRoutes)


module.exports = router;