/**
 *
 * @author arman
 * @since 25/2/2016.
 *
 */
'use strict';

const globals = {
  importModel: (modelName) => {
    return require('../models/Model' + modelName);
  },

  importService: (serviceName) => {
    return require('../services/' + serviceName + 'Service');
  }
};

module.exports = globals;