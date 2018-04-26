/**
 *
 * @author arman
 * @since 25/2/2016.
 *
 */
'use strict';

const globals = require('../helpers/globals');
const Person = globals.importModel('Person');
const Sequelize = require('sequelize');
const arrayWrap = require('arraywrap');

module.exports = {
  getAllPerson: (config) => {
    return Person.findAll({ offset: config.offset, limit: config.limit });
  },
  addPerson: (data) => {
    return Person.create(data);
  },
  updatePerson: (personId, data) => {
    return (
      Person.update(data, {
        where: {
          person_id: personId
        }
      })
    );
  },
  deletePerson: (personId) => {
    return (
      Person.destroy({
        where: {
          person_id: personId
        }
      })
    );
  }
};