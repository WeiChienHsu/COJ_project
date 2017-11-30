const express = require('express');
const app = express();
const path = require('path');
const restRouter = require('./routes/rest.js');
const indexRouter = require('./routes/index.js');

// Connect MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb://user:user@ds123976.mlab.com:23976/cs503-1705test');

app.use(express.static(path.join(__dirname, '../public/')));
app.use('/', indexRouter);
app.use('/api/v1', restRouter);

app.use((req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, '../public/')})
})

app.listen(3000, () => console.log('Example app listening on port 3000!'));