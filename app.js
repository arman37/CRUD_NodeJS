/**
 *
 * @author arman
 * @since 25/2/2016.
 *
 */
'use strict';

const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mysqlConnector = require('./helpers/mysqlConnector');
const allowCrossDomain = require('./helpers/allowCORS');
const responseModifier = require('./middlewares/responseModifier');
let config = require('./config');


const app = express();
const env = app.get('env');

config = config(env);
mysqlConnector.connect(config.mysql);

require('./helpers/bootstrap')
  .initApp(
    app
    .use(allowCrossDomain)
    .use(logger('combined'))
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())
    .use(responseModifier), express
  )
  .then(() => {
    console.info('Server started at localhost:3000');
  })
  .catch((err) => {
    console.error('Oops!!! Something went wrong when initializing the app!');
  });

module.exports = app;