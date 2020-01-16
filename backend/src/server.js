const cors = require('cors');
const express = require('express');
const app = express();
const routes = require('./routes');

//Mongoconnect
require('./db');

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(3333);

