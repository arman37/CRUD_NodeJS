/**
 *
 * @author arman
 * @since 25/2/2016.
 *
 */
'use strict';

const DataTypes = require('sequelize');
const globals = require('../helpers/globals');

const Person = globals
  .sequelize
  .define('person', {
    person_id: {type: DataTypes.BIGINT(20), allowNull: false, primaryKey: true, unsigned: true, autoIncrement: true},
    name: {type: DataTypes.STRING(255), allowNull: false, defaultValue: 'John Doe'},
    address : {type: DataTypes.STRING(255), allowNull: false},
    age: {type: DataTypes.INTEGER(10), allowNull: false, unsigned: true, validate: { isNumeric: true }},
    phone: {type: DataTypes.INTEGER(10), allowNull: false, unsigned: true},
    email: {type: DataTypes.STRING(255), allowNull: false, validate: { isEmail: true }}
  }, {
    timestamp: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'person'
  });

module.exports = Person;