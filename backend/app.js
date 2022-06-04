const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { validateUser, validateLogin } = require('./middlewares/validation');
const routes = require('./routes/index');
const { userLogin, createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(express.json());

app.post('/signin', validateLogin, userLogin);

app.post('/signup', validateUser, createUser);

app.use(routes);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      Error: statusCode === 500
        ? 'An error occurred on the server'
        : message,
    });
});

app.listen(PORT, () => console.log(`We're live on ${PORT}!`));
