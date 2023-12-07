const app = require('../server/src/app.js');
const pool = require('./src/pool/pool.js');

// Database configuration for 'socialnetwork'
const socialnetworkConfig = {
  host: 'localhost',
  port: 5432,
  database: 'socialnetwork',
  user: 'SWT',
  password: '24081987',
};

pool
  .connect(socialnetworkConfig)
  .then(() => {
    console.log('Connected to the "socialnetwork" database');

    // Database configuration for 'cars'
    const carsConfig = {
      ...socialnetworkConfig,
      database: 'cars',
    };

    // Connect to the 'cars' database
    return pool.connectCars(carsConfig);
  })
  .then(() => {
    console.log('Connected to the "cars" database');

    // Start the server
    app().listen(3005, () => {
      console.log('Listening on port 3005');
    });
  })
  .catch((err) => console.error(err));
