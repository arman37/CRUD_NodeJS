/**
 *
 * @author arman
 * @since 25/2/2016.
 *
 */
'use strict';

module.exports = (req, res, next) => {
  res.renderServerError = () => {
    this
      .status(500)
      .send('Oops! Internal server Error.');
  };
  res.renderClientError = () => {
    this
      .status(404)
      .json({messge: 'Not found!', statusCode: 404, statusText: 'error'});
  };

  next();
};