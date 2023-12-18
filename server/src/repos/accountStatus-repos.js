const pool = require('../pool/pool');
const toCamelCase = require('./utils/to-camel-case');

class AccountStatusRepo {

    // ### Get
    static async find() {
        const { rows } = await pool.query('SELECT * FROM accountstatus;');
        return toCamelCase(rows);
    }

    //   ### Get by ID
    static async findById(user_id) {
        const { rows } = await pool.query(
            `
      SELECT * FROM accountstatus WHERE user_id = $1;
      `,
            [user_id]
        );

        return toCamelCase(rows)[0];
    }

    //   ### Insert
    static async insert(user_id, is_active, is_suspended, is_deactivated, last_login, /* Other status-related fields */) {
        const {
            rows,
        } = await pool.query(
            'INSERT INTO accountstatus (user_id, is_active, is_suspended, is_deactivated, last_login /* Other status-related fields */) VALUES ($1, $2, $3, $4, $5 /* Other placeholders */) RETURNING * ;',
            [user_id, is_active, is_suspended, is_deactivated, last_login /* Add other parameter values here */]
        );

        return toCamelCase(rows)[0];
    }

    //   ### Update
    //   static async update(user_id, email, phone_number, address_line1, address_line2, city, state, postal_code, country) {
    //     const {
    //       rows
    //     } = await pool.query(
    //       'UPDATE ContactInformation SET email = $2, phone_number = $3, address_line1 = $4, address_line2 = $5, city = $6, state = $7, postal_code = $8, country = $9 WHERE user_id = $1 RETURNING *;',
    //       [user_id, email, phone_number, address_line1, address_line2, city, state, postal_code, country]
    //     );

    //     return toCamelCase(rows)[0];
    //   }

    // static async update(id, user_id, is_active, is_suspended, is_deactivated, last_login /* Add other parameters based on the table structure */) {
    //     const {
    //         rows
    //     } = await pool.query(
    //         'UPDATE AccountStatus SET user_id = $2, is_active = $3, is_suspended = $4, is_deactivated = $5, last_login = $6 /* Add other assignments based on the table structure */ WHERE status_id = $1 RETURNING *;',
    //         [id, user_id, is_active, is_suspended, is_deactivated, last_login /* Add other parameter values here */]
    //     );

    //     return toCamelCase(rows)[0];
    // }

    static async update(user_id, is_active, is_suspended, is_deactivated, last_login /* Add other parameters based on the table structure */) {
        const {
          rows
        } = await pool.query(
          'UPDATE AccountStatus SET is_active = $2, is_suspended = $3, is_deactivated = $4, last_login = $5 /* Add other assignments based on the table structure */ WHERE user_id = $1 RETURNING *;',
          [user_id, is_active, is_suspended, is_deactivated, last_login /* Add other parameter values here */]
        );
      
        return toCamelCase(rows)[0];
      }

    //   ### Delete
    static async delete(user_id) {
        const { rows } = await pool.query('DELETE FROM accountstatus WHERE user_id = $1 RETURNING *;', [user_id]);
        return toCamelCase(rows)[0];
    }
}

module.exports = AccountStatusRepo;
