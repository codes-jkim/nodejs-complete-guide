const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
  User.findById('689459f2a504fa5f4d001bbf')
    .then(user => {
      req.user = user
      next();
    })
    .catch(err => console.log(err));
});


app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect('mongodb+srv://codesjkim:dzw6YXchswctvllh@cluster0.0kzq8cx.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: "Jay",
          email: "jay@example.com",
          cart: {
            items: []
          }
        })
        user.save();
      }
    })

    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });