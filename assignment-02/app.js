const express = require('express');

const app = express();

// app.use((req, res, next) => {
//     console.log("middleware 1");
//     next();
// })

// app.use((req, res, next) => {
//     console.log("middleware 2")
//     res.send('<p>Hello Assignment 2</p>');
// })

app.use('/users', (req, res, next) => {
    console.log("/users middleware");
    res.send('<p>/users middleware</p>');
});

app.use('/', (req, res, next) => {
    console.log("/ middleware");
    res.send('<p>/ middleware</p>');
});

app.listen(3000);