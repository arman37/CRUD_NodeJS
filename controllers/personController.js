/**
 *
 * @author arman
 * @since 25/2/2016.
 *
 */
'use strict';

const globals = require('../helpers/globals');
const personService = globals.importService('person');


module.exports.controller = (app) => {
  app
    .get('/', (req, res, next) => {
      //curl 127.0.0.1:3000

      personService
        .getAllPerson({offset: 0, limit: 10})
        .then((persons) => {
          console.log("persons: " + persons);
          res.json(persons);
        })
        .catch((err) => {
          console.error('Error occurred:', err);
          res.json({success: false});
        });
    })
    .post('/', (req, res, next) => {
      //curl -X POST --data "name=Tom&age=50&address=NY&phone=33322&email=tom@cruise.com" 127.0.0.1:3000

      personService
        .addPerson(req.body)
        .then((person) => {
          res.json(person);
        })
        .catch((err) => {
          console.error('Error occurred:', err);
          res.json({success: false});
        });
    })
    .put('/:id', (req, res, next) => {
      //curl -X PUT --data "name=Tom&age=50&address=NY&phone=33322&email=tom@cruise.com" 127.0.0.1:3000/123

      personService
        .updatePerson(req.params.id, req.body)
        .then((person) => {
          res.json(person);
        })
        .catch((err) => {
          console.error('Error occurred:', err);
          res.json({success: false});
        })
    })
    .delete('/:id', (req, res, next) => {
      //curl -X DELETE 127.0.0.1:3000/31

      personService
        .deletePerson(req.params.id)
        .then((count) => {
          res.json({success: true});
        })
        .catch((err) => {
          console.error('Error occurred:', err);
          res.json({success: false});
        });
    });
};