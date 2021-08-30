const express = require('express');
const app = express();
const routes = require('./routes/index')
const cookieParser = require('cookie-parser');
app.use(cookieParser())
app.use(express.json())

app.use('/api',routes)

module.exports = app;