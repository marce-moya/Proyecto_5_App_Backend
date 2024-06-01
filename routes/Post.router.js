const express = require('express');
const router = express.Router();
const { createPost, getAllPosts } = require('../controllers/Post.controller');
const auth = require('../middleware/authorization')

router.post('/', auth, createPost);
router.get('/', auth, getAllPosts);

module.exports = router