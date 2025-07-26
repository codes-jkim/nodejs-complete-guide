const express = require('express');
const path = require('../../assignment-03/util/path');

const route = express.Router();

const userData = [];

route.get('/', (req, res) => {
    res.render('index', { pageTitle: 'Home', users: userData, path: '/' });
})
route.get('/users', (req, res) => {
    res.render('users', { pageTitle : 'Users', users: userData, path: '/users' });
})
route.post('/users', (req, res) => {
    userData.push(req.body.user);
    res.redirect('/')
})

module.exports = route;