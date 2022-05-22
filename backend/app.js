const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const userLogin = require('./controllers/login');
const createUser = require('./controllers/createUser');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '62421a46808351adbb77bb03',
  };
  next();
});

app.post('/signin', userLogin);

app.post('/signup', createUser);

app.use(routes);

app.listen(PORT, () => console.log(`We're live on ${PORT}!`));
