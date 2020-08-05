const express = require('express');
const setStatic =require('./staticConfig');

const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json())

setStatic(app, express); // 设置静态资源

module.exports = app;