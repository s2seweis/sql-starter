const express = require('express');
const usersRouter = require('./routes/users');
const assetsRouter = require('./routes/assets');
const userProfileRouter = require('./routes/userProfile');
const authRouter = require('./routes/auth');
const contactInformationRouter = require('./routes/contactInformations');
const accountStatusRouter = require('./routes/accountStatus');
const userPreferenceRouter = require('./routes/userPreference');
require('dotenv').config();

const cors = require('cors');

module.exports = () => {
  const app = express();
  app.use(cors());

  app.use(express.json());
  app.use(usersRouter);
  app.use(assetsRouter);
  app.use(userProfileRouter);
  app.use(authRouter);
  app.use(contactInformationRouter);
  app.use(accountStatusRouter);
  app.use(userPreferenceRouter);

  return app;
};
