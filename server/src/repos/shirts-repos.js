const pool = require('../pool/pool');
const toCamelCase = require('./utils/to-camel-case');

class ShirtsRepo {
  static async find() {
    const carsPool = await pool.connectCars();
    try {
      const { rows } = await carsPool.query('SELECT * FROM shirts;');
      return toCamelCase(rows);
    } finally {
      // No need to release, as it's automatically handled by the pool
    }
  }

  static async findById(id) {
    const carsPool = await pool.connectCars();
    try {
      const { rows } = await carsPool.query('SELECT * FROM shirts WHERE id = $1;', [id]);
      return toCamelCase(rows)[0];
    } finally {
      // No need to release, as it's automatically handled by the pool
    }
  }

  static async insert(des, brand, title) {
    const carsPool = await pool.connectCars();
    try {
      const { rows } = await carsPool.query(
        'INSERT INTO shirts (des, brand, title) VALUES ($1, $2, $3) RETURNING * ;',
        [des, brand, title]
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
        'UPDATE shirts SET username = $1, bio = $2 WHERE id = $3 RETURNING *;',
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
      const { rows } = await carsPool.query('DELETE FROM shirts WHERE id = $1 RETURNING *;', [id]);
      return toCamelCase(rows)[0];
    } finally {
      // No need to release, as it's automatically handled by the pool
    }
  }
}

module.exports = ShirtsRepo;
