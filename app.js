const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config({ path: './config/.env' });
const globalMiddlewareErr = require('./src/utils/globalMiddlewareErr');
const AppErr = require('./src/utils/AppError');
const { allRequires } = require('./src/utils');
const { dbConnection } = require('./src/database/dbConnection');
const { socketConnection } = require('./src/utils/socket-io');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
if (process.env.MODE_ENV == 'developmet') {
  app.use(morgan('dev'));
}

allRequires(app);

app.all('/*', (req, res, next) => {
  next(new AppErr(`can't find this route: ${req.originalUrl} on server`, 404));
});
app.use(globalMiddlewareErr);

dbConnection();

var server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

socketConnection(server, cors);

module.exports = server;