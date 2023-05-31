require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require('cors');
const cookieParser = require('cookie-parser');
// eslint-disable-next-line import/no-extraneous-dependencies
const { PORT, BASE_PATH } = require('./config');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
// eslint-disable-next-line import/no-extraneous-dependencies, import/order
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/err');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1/mestodb', {
  useNewUrlParser: true,
})
  .then(() => console.log('база подключена'))
  .catch((err) => console.log(err));

const corsOptions = {
  origin: ['http://mesto.lazarenkoea.nomoredomains.monster',
    'https://api.mesto.lazarenkoea.nomoredomains.rocks',
    'http://api.mesto.lazarenkoea.nomoredomains.rocks',
    'https://mesto.lazarenkoea.nomoredomains.monster',
    'http://localhost:3000',
    'https://localhost:3000'],
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.use(requestLogger);

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Ссылка на сервер:', `${BASE_PATH}:${PORT}`);
});
