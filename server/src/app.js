const express = require('express');
const usersRouter = require('./routes/users');
const assetsRouter = require('./routes/assets');
const userProfileRouter = require('./routes/userProfile');
const cors = require('cors');

module.exports = () => {
  const app = express();
  app.use(cors());

  app.use(express.json());
  app.use(usersRouter);
  app.use(assetsRouter);
  app.use(userProfileRouter);

  return app;
};
