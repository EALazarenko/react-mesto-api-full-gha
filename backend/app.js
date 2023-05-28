require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
/* const cors = require('cors'); */
const cookieParser = require('cookie-parser');
const cors = require('./middlewares/cors');
// eslint-disable-next-line import/no-extraneous-dependencies
const { PORT, BASE_PATH } = require('./config');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

/* const { PORT = 3001 } = process.env; */
const app = express();
// eslint-disable-next-line import/no-extraneous-dependencies, import/order
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/err');
const corsOptionsDelegate = require('./middlewares/cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);
app.use(router);

mongoose.connect('mongodb://127.0.0.1/mestodb', {
  useNewUrlParser: true,
})
  .then(() => console.log('база подключена'))
  .catch((err) => console.log(err));

app.use(cors(corsOptionsDelegate), cookieParser(), requestLogger);

/* const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions)); */

/* app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
}); */

app.listen(PORT, () => {
  console.log('Ссылка на сервер:', `${BASE_PATH}:${PORT}`);
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
