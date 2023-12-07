const { Pool } = require('pg');

class DatabasePool {
  _pool = null;

  connect(options) {
    this._pool = new Pool(options);
    return this._pool.query('SELECT 1 + 1;');
  }

  connectCars(options) {
    const carsOptions = {
      ...options,
      database: 'cars', // Specify the "cars" database
    };

    const carsPool = new Pool(carsOptions);

    // Attach the query method to carsPool to make it compatible with the rest of the code
    carsPool.query = carsPool.query.bind(carsPool);

    return carsPool;
  }

  close() {
    return this._pool.end();
  }

  query(sql, params) {
    return this._pool.query(sql, params);
  }
}

module.exports = new DatabasePool();
