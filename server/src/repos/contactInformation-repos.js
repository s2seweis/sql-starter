const pool = require('../pool/pool');
const toCamelCase = require('./utils/to-camel-case');

// represents a repository for interacting with a PostgreSQL database table named "contactinformation."

class ContactInformationRepo {
  static async find() {
    const { rows } = await pool.query('SELECT * FROM contactinformation;');

    return toCamelCase(rows);
  }

  static async findById(user_id) {
    const { rows } = await pool.query(
      `
      SELECT * FROM contactinformation WHERE user_id = $1;
      `,
      [user_id]
    );

    return toCamelCase(rows)[0];
  }

  // ### old

  // static async insert (user_id, bio, date_of_birth, location, website_url, profile_picture_url) {
  //   const {
  //     rows,
  //   } = await pool.query (
  //     'INSERT INTO contactinformation (user_id, bio, date_of_birth, location, website_url, profile_picture_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING * ;',
  //     [user_id, bio, date_of_birth, location, website_url, profile_picture_url]
  //   );

  //   return toCamelCase (rows)[0];
  // }
  // ### new

  static async insert(user_id, email, phone_number, address_line1, address_line2, city, state, postal_code, country) {
    const {
      rows,
    } = await pool.query(
      'INSERT INTO contactinformation (user_id, email, phone_number, address_line1, address_line2, city, state, postal_code, country) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING * ;',
      [user_id, email, phone_number, address_line1, address_line2, city, state, postal_code, country]
    );

    return toCamelCase(rows)[0];
  }

  // static async update(user_id, bio, date_of_birth, location, website_url, profile_picture_url) {
  //   const {
  //     rows,
  //   } = await pool.query(
  //     'UPDATE contactinformation SET bio = $2, date_of_birth = $3, location = $4, website_url = $5, profile_picture_url = $6 WHERE user_id = $1 RETURNING *;',
  //     [user_id, bio, date_of_birth, location, website_url, profile_picture_url]
  //   );

  //   return toCamelCase(rows)[0];
  // }

  static async update(user_id, email, phone_number, address_line1, address_line2, city, state, postal_code, country) {
    const {
      rows
    } = await pool.query(
      'UPDATE ContactInformation SET email = $2, phone_number = $3, address_line1 = $4, address_line2 = $5, city = $6, state = $7, postal_code = $8, country = $9 WHERE user_id = $1 RETURNING *;',
      [user_id, email, phone_number, address_line1, address_line2, city, state, postal_code, country]
    );
  
    return toCamelCase(rows)[0];
  }

  // ### 

  static async delete(user_id) {
    const { rows } = await pool.query('DELETE FROM contactinformation WHERE user_id = $1 RETURNING *;', [user_id]);
    return toCamelCase(rows)[0];
  }
}

module.exports = ContactInformationRepo;
