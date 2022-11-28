const getUsers = require('../../controllers/userController');

const router = require('express').Router();

router.route('/').get(getUsers);

module.exports = router;