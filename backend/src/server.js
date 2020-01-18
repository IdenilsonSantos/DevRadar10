const cors = require('cors');
const express = require('express');
const http = require('http');
const routes = require('./routes');
const { setupWebSocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebSocket(server);

//Mongoconnect
require('./db');

app.use(express.json());
app.use(cors());
app.use(routes);

server.listen(3333);

