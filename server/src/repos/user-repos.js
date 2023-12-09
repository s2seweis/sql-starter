const pool = require ('../pool/pool');
const toCamelCase = require ('./utils/to-camel-case');

// represents a repository for interacting with a PostgreSQL database table named "users."

class UserRepo {
  static async find () {
    const {rows} = await pool.query ('SELECT * FROM users;');

    return toCamelCase (rows);
  }

  static async findById (user_id) {
    const {rows} = await pool.query (
      `
      SELECT * FROM users WHERE user_id = $1;
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
      'INSERT INTO users (username, email, full_name, profile_picture_url) VALUES ($1, $2, $3, $4) RETURNING * ;',
      [username, email, full_name, profile_picture_url]
    );

    return toCamelCase (rows)[0];
  }

  static async update (id, username, bio) {
    const {
      rows,
    } = await pool.query (
      'UPDATE users SET username = $1, bio = $2 WHERE id = $3 RETURNING *;',
      [username, bio, id]
    );

    return toCamelCase (rows)[0];
  }

  static async delete (id) {
    const {rows} = await pool.query ('DELETE FROM users WHERE id = $1 RETURNING *;', [id]);
    return toCamelCase (rows)[0];
  }
}

module.exports = UserRepo;
