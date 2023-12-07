const express = require('express');
const usersRouter = require('./routes/users');
const carsRouter = require('./routes/cars');

module.exports = () => {
  const app = express();

  app.use(express.json());
  app.use(usersRouter);
  app.use(carsRouter);

  return app;
};
