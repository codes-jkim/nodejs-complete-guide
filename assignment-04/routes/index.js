const express = require('express');
const path = require('../../assignment-03/util/path');

const route = express.Router();

const controller = require('../controller/index');

route.get('/', controller.getUsers);
route.get('/users', controller.getAddUserPage);
route.post('/users', controller.addUser);

module.exports = route;