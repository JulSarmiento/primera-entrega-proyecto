const express = require('express');
const routerIndex = require('./src/router/index');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(routerIndex);

module.exports = app;