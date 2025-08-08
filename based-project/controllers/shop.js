const Product = require('../models/product');
const Order = require('../models/order');
const path = require('../util/path');
const user = require('../models/user');

exports.getProducts = (req, res, next) => {
  Product.find().then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products',
      isAuthenticated: req.session.isLoggedIn
    });
  }).catch(err => console.log(err))
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products',
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.find().then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      isAuthenticated: req.session.isLoggedIn
    })
  }).catch(err => console.log(err))
};

exports.getCart = (req, res, next) => {
  req.user.populate('cart.items.productId')
    .then(user => {
      const products = user.cart.items;
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products,
        isAuthenticated: req.session.isLoggedIn
      })
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
}

exports.postCartDelete = (req, res, next) => {
  const productId = req.body.productId;
  req.user.removeFromCart(productId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
}

exports.postOrder = (req, res, next) => {
  req.user.populate('cart.items.productId')
    .then(user => {
      const products = user.cart.items.map(item => {
        return { quantity: item.quantity, product: { ...item.productId._doc } }
      });
      const order = new Order({
        products: products,
        user: {
          userId: req.user,
          name: req.user.name,
        }
      })
      return order.save()
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(() => {
      console.log("Order placed successfully");
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
}

exports.getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user })
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders,
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
