const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

const isAuth = require('../middleware/is-auth');
const expValidator = require('express-validator');

// /admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get('/products', isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', [
  expValidator.body('title').isString().isLength({ min: 3 }).trim(),
  expValidator.body('imageUrl').isURL(),
  expValidator.body('price').isFloat(),
  expValidator.body('description').isLength({ min: 5, max: 400 }).trim()
], isAuth, adminController.postAddProduct);

// /admin/edit-product => GET
router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

// /admin/edit-product => POST
router.post('/edit-product', [
  expValidator.body('title').isString().isLength({ min: 3 }).trim(),
  expValidator.body('imageUrl').isURL(),
  expValidator.body('price').isFloat(),
  expValidator.body('description').isLength({ min: 5, max: 400 }).trim()
], isAuth, adminController.postEditProduct);

// /admin/delete => POST
router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;
