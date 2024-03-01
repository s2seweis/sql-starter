const app = require('./src/app.js');
const pool = require('./src/pool/pool.js');
const path = require("path"); // Import the 'path' module

// Database configuration for 'DeliveryShopDB'
const deliveryShopConfig = {
  host: 'ec2-107-21-67-46.compute-1.amazonaws.com',
  port: 5432,
  database: 'd1gch85sbm0pt5',
  user: 'uvftaacwpaegoj',
  password: '346f1cff02ecdc129738d2d8a0596a6ee854252f8434e643890b97010c96f536',
  ssl: {
    rejectUnauthorized: false,
  },
};

pool
  .connect(deliveryShopConfig)
  .then(() => {
    console.log('Connected to the "DeliveryShopDB" database');

    // Database configuration for 'assets'
    const carsConfig = {
      ...deliveryShopConfig,
      database: 'Assets',
    };

    // Connect to the 'assets' database
    return pool.connectAssets(carsConfig);
  })
  .then(() => {
    console.log('Connected to the "Assets" database');

    // Start the server with a dynamic port for Heroku
    const PORT = process.env.PORT || 3005;

    app().listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((err) => console.error(err));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
