const express = require('express');
const usersRouter = require('./routes/users');
const carsRouter = require('./routes/cars');
const shirtsRouter = require('./routes/shirts');
const cors = require('cors');

module.exports = () => {
  const app = express();
  app.use(cors());

  app.use(express.json());
  app.use(usersRouter);
  app.use(carsRouter);
  app.use(shirtsRouter);

  return app;
};
