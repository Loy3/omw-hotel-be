const express = require("express");
// const mongoose = require("mongoose");
// const bcrypt = require('bcrypt');
const router = express.Router();
userController = require('../controllers/userController');

router.get('/', (req, res) => {
    res.send('Hello San Roi!');
});
// upload image
router.post('/user_image', userController.user_image);

// update image
router.post('/update_user_image', userController.update_user_image);

// get message
// router.get('/user_getMessages/:id', userController.user_getMessages);

module.exports = router;