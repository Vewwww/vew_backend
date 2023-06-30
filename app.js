const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config({ path: './config/.env' });
const globalMiddlewareErr = require('./src/utils/globalMiddlewareErr');
const AppErr = require('./src/utils/AppError');
const { allRequires } = require('./src/utils');

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
if (process.env.MODE_ENV == 'development') {
  app.use(morgan('dev'));
}

allRequires(app);

app.all('/*', (req, res, next) => {
  next(new AppErr(`can't find this route: ${req.originalUrl} on server`, 404));
});
app.use(globalMiddlewareErr);

module.exports = app;
