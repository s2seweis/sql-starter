const pool = require('../pool/pool');
const toCamelCase = require('./utils/to-camel-case');

// represents a repository for interacting with a PostgreSQL database table named "Basket."

class BasketRepo {
  static async find() {
    const { rows } = await pool.query('SELECT * FROM Basket;');

    return toCamelCase(rows);
  }

  // static async findById (user_id) {
  //   const {rows} = await pool.query (
  //     `
  //     SELECT * FROM Basket WHERE user_id = $1;
  //     `,
  //     [user_id]
  //   );

  //   return toCamelCase (rows)[0];
  // }

  static async findById(user_id) {
    const { rows } = await pool.query(
      'SELECT * FROM Basket WHERE user_id = $1;',
      [user_id]
    );

    return toCamelCase(rows);
  }

  // ### 

  static async insert({ user_id, productid, productname, price, category, quantity }) {
    const {
      rows,
    } = await pool.query(
      'INSERT INTO Basket (user_id, productid, productname, price, category, quantity) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;',
      [user_id, productid, productname, price, category, quantity]
    );

    return toCamelCase(rows)[0];
  }

  // ### 

  // static async update (user_id, bio, date_of_birth, location, website_url, profile_picture_url) {
  //   const {
  //     rows,
  //   } = await pool.query (
  //     'UPDATE Basket SET username = $1, email = $2, full_name = $3, profile_picture_url = $4 WHERE user_id = $5 RETURNING *;',
  //     [user_id, bio, date_of_birth, location, website_url, profile_picture_url]
  //   );

  //   return toCamelCase (rows)[0];
  // }

  // ###

  // static async update(user_id, bio, date_of_birth, location, website_url, profile_picture_url) {
  //   const {
  //     rows,
  //   } = await pool.query(
  //     'UPDATE Basket SET user_id=$1, bio = $2, date_of_birth = $3, location = $4, website_url = $5, profile_picture_url = $6 WHERE user_id = $7 RETURNING *;',
  //     [user_id, bio, date_of_birth, location, website_url, profile_picture_url]
  //   );

  //   return toCamelCase(rows)[0];
  // }

  static async update(user_id, bio, date_of_birth, location, website_url, profile_picture_url) {
    const {
      rows,
    } = await pool.query(
      'UPDATE Basket SET bio = $2, date_of_birth = $3, location = $4, website_url = $5, profile_picture_url = $6 WHERE user_id = $1 RETURNING *;',
      [user_id, bio, date_of_birth, location, website_url, profile_picture_url]
    );

    return toCamelCase(rows)[0];
  }

  // ### 

  static async delete(user_id) {
    const { rows } = await pool.query('DELETE FROM Basket WHERE user_id = $1 RETURNING *;', [user_id]);
    return toCamelCase(rows)[0];
  }
}

module.exports = BasketRepo;
