const express = require('express');
const usersRouter = require('./routes/users');
const assetsRouter = require('./routes/assets');
const userProfileRouter = require('./routes/userProfile');
const authRouter = require('./routes/auth');
const contactInformationRouter = require('./routes/contactInformations');
const accountStatusRouter = require('./routes/accountStatus');
const userPreferenceRouter = require('./routes/userPreference');
const notificationPreferenceRouter = require('./routes/notificationPreferences');
const productsRouter = require('./routes/products');
const basketRouter = require('./routes/basket');
require('dotenv').config();

const cors = require('cors');

module.exports = () => {
  const app = express();
  app.use(cors());

  // app.use(cors({
  //   origin: 'http://localhost:3000'
  // }));

  app.use(express.json());
  app.use(usersRouter);
  app.use(assetsRouter);
  app.use(userProfileRouter);
  app.use(authRouter);
  app.use(contactInformationRouter);
  app.use(accountStatusRouter);
  app.use(userPreferenceRouter);
  app.use(notificationPreferenceRouter);
  app.use(productsRouter);
  app.use(basketRouter);

  return app;
};
