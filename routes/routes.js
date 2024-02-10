const router = require('express').Router();
const BookRoutes = require('./bookRoutes');
const UserRoutes = require('./userRoutes')

router.use('/book', BookRoutes)

router.use('/user', UserRoutes)


module.exports = router;