const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://express-for-postgre-933b44694c3e.herokuapp.com',
      changeOrigin: true,
      logLevel: 'debug',
    })
  );
};
