const app = require('../server/src/app.js');
const pool = require('./src/pool/pool.js');

// Database configuration for 'DeliveryShopDB'
const deliveryShopConfig = {
  host: 'localhost',
  port: 5432,
  database: 'DeliveryShopDB',
  user: 'SWT',
  password: '24081987',
};

pool
  .connect(deliveryShopConfig)
  .then(() => {
    console.log('Connected to the "DeliveryShopDB" database');

    // Database configuration for 'assets'
    const carsConfig = {
      ...deliveryShopConfig,
      database: 'Assets',
      // copying the DeliveryShopDB configuration and changing the database name
    };

    // Connect to the 'assets' database
    return pool.connectAssets(carsConfig);
  })
  .then(() => {
    console.log('Connected to the "Assets" database');

    // Start the server
    app().listen(3005, () => {
      console.log('Listening on port 3005');
    });
  })
  .catch((err) => console.error(err));
