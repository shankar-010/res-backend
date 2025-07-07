const logger = require('winston');

const errorHandler = (err, req, res, next) => {
  logger.error(err.message, { error: err });
  res.status(500).json({ error: 'Internal server error' });
};

module.exports = errorHandler;