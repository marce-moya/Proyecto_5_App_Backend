const express = require('express');
const router = express.Router();
const { getAllUsers, signUp, login, updateUser, deleteUser } = require('../controllers/User.controller');
const auth = require('../middlewares/auth')

router.get('/', auth, getAllUsers);
router.post('/signup', signUp);
router.post('/login', login);
router.put('/', updateUser);
router.delete('/', deleteUser);

//http:localhost:3000/v1/users/signup
//http:localhost:3000/v1/users/login

module.exports = router