const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User.controller');
const { getAllUsers, signUp, login, updateUser, deleteUser } = UserController;
const auth = require('../middleware/authorization')

router.get('/', auth, getAllUsers);
router.post('/signup', signUp);
router.post('/login', login);
router.put('/', updateUser);
router.delete('/', deleteUser);

//http:localhost:3000/v1/users/signup
//http:localhost:3000/v1/users/login

module.exports = router;