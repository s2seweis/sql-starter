const pool = require ('../pool/pool');
const toCamelCase = require ('./utils/to-camel-case');

// represents a repository for interacting with a PostgreSQL database table named "Users."

class UserRepo {

  
  static async find () {
    const {rows} = await pool.query ('SELECT * FROM Users;');

    return toCamelCase (rows);
  }

  static async findById (user_id) {
    const {rows} = await pool.query (
      `
      SELECT * FROM Users WHERE user_id = $1;
      `,
      [user_id]
    );

    return toCamelCase (rows)[0];
  }

  // ### works

  static async insert (username, email, full_name, profile_picture_url) {
    const {
      rows,
    } = await pool.query (
      'INSERT INTO Users (username, email, full_name, profile_picture_url) VALUES ($1, $2, $3, $4) RETURNING * ;',
      [username, email, full_name, profile_picture_url]
    );

    return toCamelCase (rows)[0];
  }

  // ### works

  static async update (user_id, username, email, full_name, profile_picture_url) {
    const {
      rows,
    } = await pool.query (
      'UPDATE Users SET username = $1, email = $2, full_name = $3, profile_picture_url = $4 WHERE user_id = $5 RETURNING *;',
      [username, email, full_name, profile_picture_url, user_id]
    );

    return toCamelCase (rows)[0];
  }

  // ### works

  static async delete (user_id) {
    const {rows} = await pool.query ('DELETE FROM Users WHERE user_id = $1 RETURNING *;', [user_id]);
    return toCamelCase (rows)[0];
  }
}

module.exports = UserRepo;
