const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { validateUser, validateLogin } = require('./middlewares/validation');
const routes = require('./routes/index');
const { userLogin, createUser } = require('./controllers/users');

require('dotenv').config();

const { PORT = 3000, HOST = 'localhost' } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(cors());

app.options('*', cors());

app.use(requestLogger);

app.use(express.json());

app.post('/login', validateLogin, userLogin);

app.post('/signup', validateUser, createUser);

app.use(routes);

app.use(errorLogger);

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

app.listen(PORT, HOST, () => console.log(`We're live on ${HOST}:${PORT}!`));
