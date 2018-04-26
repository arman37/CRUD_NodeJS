/**
 *
 * @author arman
 * @since 25/2/2016.
 *
 */
'use strict';

const fs = require('fs');
const path = require('path');
const globals = require('./globals');
const Person = globals.importModel('Person');

let initControllers = (app) => {
  let route = null;

  fs.readdirSync(path.resolve(__dirname, '../controllers')).forEach((file) => {
    if(file.substr(-3) === '.js') {
      route = require('../controllers/' + file);
      route.controller(app);
    }
  });
};

let initModels = () => {
  loadModels();

  return (
    globals
      .sequelize
      .sync({force: false})
      .then(() => {
        console.log('Finished database synchronization.');
      })
      .then(insertDefaultData)
      .catch((err) => {
        console.error('Error occurred during database synchronization:', err);
      })
  );
};

let loadModels = () => {
  fs.readdirSync(path.resolve(__dirname, '../models')).forEach((file) => {
    if (file.substr(-3) === '.js') {
      require('../models/' + file);
      console.log('Finished loading model:', file);
    }
  });
};

let insertDefaultData = () => {
  let persons = [
      {name: 'John Doe', age: 30, address: 'NY', phone: 22222333, email: 'abc@abc.com'},
      {name: 'Tom Cruise', age: 54, address: 'NY', phone: 22222333, email: 'tom@tomcruise.com'},
      {name: 'Tom Brady', age: 32, address: 'NY', phone: 22222333, email: 'tom@tombrady.com'},
      {name: 'Tom Hanks', age: 53, address: 'NY', phone: 22222333, email: 'tom@tomhanks.com'},
      {name: 'Tom Hardy', age: 31, address: 'NY', phone: 22222333, email: 'tom@tomhardy.com'}
  ];

  return (
    Person
      .count()
      .then((count) => {
        if(count === 0) {
          return (
            Person
              .bulkCreate(persons)
              .then(() => {
                console.log('Successfully finished inserting data.');
              })
              .catch((err) => {
                console.error('Error occurred during inserting data:', err);
              })
          );
        }
      })
  );
};

let registerStaticResources = (app, express) => {
  app.use(express.static(path.join(__dirname, '../public')));
};

let register404 = (app) => {
  app.use((req, res) => {
    res.renderClientError();
  });
};

module.exports.initApp = (app, express) => {
  return (
    Promise
      .resolve()
      .then(initControllers.bind(null, app))
      .then(initModels)
      .then(registerStaticResources.bind(null, app, express))
      .then(register404.bind(null, app))
      .then(() => {
        console.log('Successfully completed all bootstrapping jobs.')
      })
      .catch(() => {
        console.error('Oops!!! Error occurred during bootstrapping.');
      })
  );
};