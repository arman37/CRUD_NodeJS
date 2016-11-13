'use strict';

module.exports = function (req, res, next) {
    res.renderServerError = function () {
        this
            .status(500)
            .send('Oops! Internal server Error.');
    };
    res.renderClientError = function () {
        this
            .status(404)
            .json({messge: 'Not found!', statusCode: 404, statusText: 'error'});
    };
    next();
};