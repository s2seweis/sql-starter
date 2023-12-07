const pool = require('../pool/pool');
const toCamelCase = require('./utils/to-camel-case');

class CarsRepo {
  static async find() {
    const carsPool = await pool.connectCars();
    try {
      const { rows } = await carsPool.query('SELECT * FROM cars;');
      return toCamelCase(rows);
    } finally {
      // No need to release, as it's automatically handled by the pool
    }
  }

  static async findById(id) {
    const carsPool = await pool.connectCars();
    try {
      const { rows } = await carsPool.query('SELECT * FROM cars WHERE id = $1;', [id]);
      return toCamelCase(rows)[0];
    } finally {
      // No need to release, as it's automatically handled by the pool
    }
  }

  static async insert(username, bio) {
    const carsPool = await pool.connectCars();
    try {
      const { rows } = await carsPool.query(
        'INSERT INTO cars (username, bio) VALUES ($1, $2) RETURNING * ;',
        [username, bio]
      );
      return toCamelCase(rows)[0];
    } finally {
      // No need to release, as it's automatically handled by the pool
    }
  }

  static async update(id, username, bio) {
    const carsPool = await pool.connectCars();
    try {
      const { rows } = await carsPool.query(
        'UPDATE cars SET username = $1, bio = $2 WHERE id = $3 RETURNING *;',
        [username, bio, id]
      );
      return toCamelCase(rows)[0];
    } finally {
      // No need to release, as it's automatically handled by the pool
    }
  }

  static async delete(id) {
    const carsPool = await pool.connectCars();
    try {
      const { rows } = await carsPool.query('DELETE FROM cars WHERE id = $1 RETURNING *;', [id]);
      return toCamelCase(rows)[0];
    } finally {
      // No need to release, as it's automatically handled by the pool
    }
  }
}

module.exports = CarsRepo;
