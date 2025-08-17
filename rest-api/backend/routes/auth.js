const express = require('express');
const router = express.Router();
const expValidator = require('express-validator');

const User = require('../models/user');
const authController = require('../controllers/auth');

router.put('/signup', [
  expValidator.body('email').isEmail().withMessage('Please enter a valid email address.').custom((value, { req }) => {
    return User.findOne({ email: value }).then(userDoc => {
      if (userDoc) {
        return Promise.reject('E-Mail address already exists!');
      }
    })
  }).normalizeEmail(),
  expValidator.body('password').isLength({ min: 5 }),
  expValidator.body('name').trim().not().isEmpty()],
  authController.signup)

router.post('/login', authController.login);

module.exports = router;