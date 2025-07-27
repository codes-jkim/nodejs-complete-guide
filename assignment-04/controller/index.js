const User = require('../models/user');

// /users => GET
exports.getAddUserPage = (req, res) => {
    res.render('users', { pageTitle: 'Users', path: '/users' });
}

// /users => POST
exports.addUser = (req, res) => {
    const user = new User(req.body.user);
    user.save();
    res.redirect('/');
};

// / => GET
exports.getUsers = (req, res) => {
    const users = User.fetchAll((users) => {
        res.render('index', { pageTitle: 'Home', users: users, path: '/' });
    });
    
}