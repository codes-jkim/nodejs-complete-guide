const express = require('express');
const app = express();
const path = require('path');

const bodyParser = require('body-parser');

const errorController = require('./controller/error');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
// app.set('view engine', 'pug');
app.set('view engine', 'ejs');
app.set('views', 'views');


const usersRouter = require('./routes');
app.use(usersRouter);

app.use(errorController.get404Page)

app.listen(3000)
