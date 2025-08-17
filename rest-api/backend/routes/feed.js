const express = require('express');
const expValidator = require('express-validator');
const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

// GET /feed/posts
router.get('/posts', isAuth, feedController.getPosts);

// POST /feed/post
router.post('/post', isAuth, [
  expValidator.body('title').isString().isLength({ min: 5 }).trim(),
  expValidator.body('content').isString().isLength({ min: 5 }).trim()
], feedController.createPost);

router.get('/post/:postId', isAuth, feedController.getPostById);

router.put('/post/:postId', isAuth, [
  expValidator.body('title').isString().isLength({ min: 5 }).trim(),
  expValidator.body('content').isString().isLength({ min: 5 }).trim(),
], feedController.updatePost);

router.delete('/post/:postId', isAuth, feedController.deletePost);

module.exports = router;
