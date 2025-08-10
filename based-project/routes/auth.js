const express = require('express');
const expValidator = require('express-validator');

const User = require('../models/user');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', [
  expValidator.body('email').isEmail().withMessage('Please enter a valid email address.').normalizeEmail(),
  expValidator.body('password', 'Password must be at least 5 characters long and contain only alphanumeric characters.').isLength({ min: 5 }).isAlphanumeric().trim(),
], authController.postLogin);

router.post('/signup',
  [
    expValidator.check('email').isEmail().withMessage('Please enter a valid email address.')
      .custom((value, { req }) => {
        return User.findOne({ email: req.body.email })
          .then(userDoc => {
            if (userDoc) {
              return Promise.reject('Email exists already, please pick a different one.');
            }
          })
      }).normalizeEmail(),
    expValidator.body('password', 'Password must be at least 5 characters long and contain only alphanumeric characters.').isLength({ min: 5 }).isAlphanumeric().trim(),
    expValidator.body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords have to match!');
      }
      return true;
    }).trim()
  ],
  authController.postSignup);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;