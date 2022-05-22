const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const auth = require('./middlewares/auth');
const { userLogin, createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(express.json());

app.use(auth);

app.post('/signin', userLogin);

app.post('/signup', createUser);

app.use(routes);

app.listen(PORT, () => console.log(`We're live on ${PORT}!`));
