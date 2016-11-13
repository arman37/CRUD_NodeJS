'use strict';

var globals = require('../helpers/globals');
var personService = globals.importService('person');


module.exports.controller = function (app) {
    app
        .get('/', function (req, res, next) {
            //curl 127.0.0.1:3000
            personService
                .getAllPerson({offset: 0, limit: 10})
                .then(function (persons) {
                    console.log("persons: " + persons);
                    res.json(persons);
                })
                .catch(function (err) {
                    console.error('Error occurred:', err);
                    res.json({success: false});
                });
        })
        .post('/', function (req, res, next) {
            //curl -X POST --data "name=Tom&age=50&address=NY&phone=33322&email=tom@cruise.com" 127.0.0.1:3000
            personService
                .addPerson(req.body)
                .then(function (person) {
                    res.json(person);
                })
                .catch(function (err) {
                    console.error('Error occurred:', err);
                    res.json({success: false});
                });
        })
        .put('/:id', function (req, res, next) {
            //curl -X PUT --data "name=Tom&age=50&address=NY&phone=33322&email=tom@cruise.com" 127.0.0.1:3000/123
            personService
                .updatePerson(req.params.id, req.body)
                .then(function (person) {
                    res.json(person);
                })
                .catch(function (err) {
                    console.error('Error occurred:', err);
                    res.json({success: false});
                })
        })
        .delete('/:id', function (req, res, next) {
            //curl -X DELETE 127.0.0.1:3000/31
            personService
                .deletePerson(req.params.id)
                .then(function (count) {
                    res.json({success: true});
                })
                .catch(function (err) {
                    console.error('Error occurred:', err);
                    res.json({success: false});
                });
        });
};