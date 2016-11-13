'use strict';

var globals = {
    importModel: function (modelName) {
        return require('../models/Model' + modelName);
    },

    importService: function (serviceName) {
        return require('../services/' + serviceName + 'Service');
    }

};

module.exports = globals;