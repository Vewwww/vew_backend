const cors = require('cors');
require('dotenv').config({ path: './config/.env' });
const { dbConnection } = require('./src/database/dbConnection');
const { socketConnection } = require('./src/utils/socket-io');
const port = process.env.PORT || 5000;
const app = require("./app")



dbConnection();

var server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

socketConnection(server, cors);