'use strict';

var fs = require('fs')
    ,path = require('path')
    ,globals = require('./globals')
    ,Person = globals.importModel('Person');

var initControllers = function (app) {
    var route = null;
    fs.readdirSync(path.resolve(__dirname, '../controllers')).forEach(function (file) {
        if(file.substr(-3) === '.js') {
            route = require('../controllers/' + file);
            route.controller(app);
        }
    });
};

var initModels = function () {
    loadModels();
    globals
        .sequelize
        .sync({force: false})
        .then(function () {
            console.log('Finished database synchronization.');
            insertDefaultData();
        })
        .catch(function (err) {
            console.error('Error occurred during database synchronization:', err);
        });
};

var loadModels = function () {
    fs.readdirSync(path.resolve(__dirname, '../models')).forEach(function (file) {
        if(file.substr(-3) === '.js') {
            require('../models/' + file);
            console.log('Finished loading model:', file);
        }
    });
};

var insertDefaultData = function () {
    var persons = [
        {name: 'John Doe', age: 30, address: 'NY', phone: 22222333, email: 'abc@abc.com'},
        {name: 'Tom Cruise', age: 54, address: 'NY', phone: 22222333, email: 'tom@tomcruise.com'},
        {name: 'Tom Brady', age: 32, address: 'NY', phone: 22222333, email: 'tom@tombrady.com'},
        {name: 'Tom Hanks', age: 53, address: 'NY', phone: 22222333, email: 'tom@tomhanks.com'},
        {name: 'Tom Hardy', age: 31, address: 'NY', phone: 22222333, email: 'tom@tomhardy.com'}
    ];
    Person
        .count()
        .then(function (count) {
            if(count === 0) {
                Person
                    .bulkCreate(persons)
                    .then(function () {
                        console.log('Successfully finished inserting data.');
                    })
                    .catch(function (err) {
                        console.error('Error occurred during inserting data:', err);
                    });
            }
        })
};

var registerStaticResources = function (app, express) {
    app.use(express.static(path.join(__dirname, '../public')));
};

var register404 = function (app) {
    app.use(function (req, res) {
        res.renderClientError();
    });
};

module.exports.initApp = function (app, express) {
    initControllers(app);
    initModels();
    registerStaticResources(app, express);
    register404(app);
};