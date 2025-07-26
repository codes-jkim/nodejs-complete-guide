const express = require('express');
const app = express();
const path = require('path');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, 'public')));
// app.set('view engine', 'pug');
app.set('view engine', 'ejs');
app.set('views', 'views');


const usersRouter = require('./routes');
app.use(usersRouter);

app.use((req, res) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found', path: '' });
})

app.listen(3000)
