'use strict';

var express = require('express')
    ,path = require('path')
    ,logger = require('morgan')
    ,bodyParser = require('body-parser')
    ,mysqlConnector = require('./helpers/mysqlConnector')
    ,allowCrossDomain = require('./helpers/allowCORS')
    ,responseModifier = require('./middlewares/responseModifier')
    ,config = require('./config');


var app = express();
var env = app.get('env') == 'development' ? 'local' : app.get('env');

config = config(env);
mysqlConnector.connect(config.mysql);

require('./helpers/bootstrap').initApp(
    app
    .use(allowCrossDomain)
    .use(logger('combined'))
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())
    .use(responseModifier), express);

module.exports = app;