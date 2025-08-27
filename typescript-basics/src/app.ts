import bodyParser from 'body-parser';
import express from 'express';

import todosRoutes from './route/todos.js';

const app = express();

app.use(bodyParser.json());
app.use(todosRoutes);

app.listen(3000);