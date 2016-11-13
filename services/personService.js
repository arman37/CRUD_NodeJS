'use strict';

var globals = require('../helpers/globals')
    ,Person = globals.importModel('Person')
    ,Sequelize = require('sequelize')
    ,arrayWrap = require('arraywrap');

module.exports = {
    getAllPerson: function (config) {
        return Person.findAll({ offset: config.offset, limit: config.limit });
    },
    addPerson: function (data) {
        return Person.create(data);
    },
    updatePerson: function (personId, data) {
        return Person.update(data, {
            where: {
                person_id: personId
            }
        });
    },
    deletePerson: function (personId) {
        return Person.destroy({
            where: {
                person_id: personId
            }
        });
    }
};