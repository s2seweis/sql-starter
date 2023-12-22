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

  // static async delete (user_id) {
  //   const {rows} = await pool.query ('DELETE FROM Users WHERE user_id = $1 RETURNING *;', [user_id]);
  //   return toCamelCase (rows)[0];
  // }




  // ### - Test

  static async delete(user_id) {
    
    // Delete references from the "accountstatus" table
    const accountStatusDeleteQuery = 'DELETE FROM accountstatus WHERE user_id = $1 RETURNING *;';
    const accountStatusResult = await pool.query(accountStatusDeleteQuery, [user_id]);
    const deletedAccountStatusUser = toCamelCase(accountStatusResult.rows)[0];
    
    // Delete references from the "contactinformation" table
    const contactInfoDeleteQuery = 'DELETE FROM contactinformation WHERE user_id = $1 RETURNING *;';
    const contactInfoResult = await pool.query(contactInfoDeleteQuery, [user_id]);
    const deletedContactInfoUser = toCamelCase(contactInfoResult.rows)[0];

    // Delete references from the "Users" table
    const authDeleteQuery = 'DELETE FROM Users WHERE user_id = $1 RETURNING *;';
    const authResult = await pool.query(authDeleteQuery, [user_id]);
    const deletedAuthUser = toCamelCase(authResult.rows)[0];

    // You can return the deleted user from the relevant table, or decide on a structure for the response
    return {
      deletedAuthUser,
      deletedAccountStatusUser,
      deletedContactInfoUser,
    };
  }

  // ### - Test End



}



module.exports = UserRepo;
