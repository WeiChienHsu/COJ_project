const express = require('express');
const app = express();
const restRouter = require('./routes/rest.js');
// Connect MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb://user:user@ds123976.mlab.com:23976/cs503-1705test');

app.use('/api/v1', restRouter);

app.listen(3000, () => console.log('Example app listening on port 3000!'));