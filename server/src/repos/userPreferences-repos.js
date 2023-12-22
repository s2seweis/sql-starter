const pool = require('../pool/pool');
const toCamelCase = require('./utils/to-camel-case');

class UserPreferenceRepo {

    // ### Get
    static async find() {
        const { rows } = await pool.query('SELECT * FROM userpreferences;');
        return toCamelCase(rows);
    }

    //   ### Get by ID
    static async findById(user_id) {
        const { rows } = await pool.query(
            `
      SELECT * FROM userpreferences WHERE user_id = $1;
      `,
            [user_id]
        );

        return toCamelCase(rows)[0];
    }

    //   ### Insert - works
    static async insert(user_id, theme, language, receive_email_notifications, show_online_status /* Other preferences-related fields */) {
        const {
            rows,
        } = await pool.query(
            'INSERT INTO userpreferences (user_id, theme, language, receive_email_notifications, show_online_status /* Other preferences-related fields */) VALUES ($1, $2, $3, $4, $5 /* Other placeholders */) RETURNING * ;',
            [user_id, theme, language, receive_email_notifications, show_online_status /* Add other parameter values here */]
        );
    
        return toCamelCase(rows)[0];
    }

    // ### Update
    // static async update(user_id, is_active, is_suspended, is_deactivated, last_login /* Add other parameters based on the table structure */) {
    //     const {
    //       rows
    //     } = await pool.query(
    //       'UPDATE AccountStatus SET is_active = $2, is_suspended = $3, is_deactivated = $4, last_login = $5 /* Add other assignments based on the table structure */ WHERE user_id = $1 RETURNING *;',
    //       [user_id, is_active, is_suspended, is_deactivated, last_login /* Add other parameter values here */]
    //     );
      
    //     return toCamelCase(rows)[0];
    //   }

    static async update(user_id, theme, language, receive_email_notifications, show_online_status /* Add other parameters based on the table structure */) {
        const {
          rows
        } = await pool.query(
          'UPDATE UserPreferences SET theme = $2, language = $3, receive_email_notifications = $4, show_online_status = $5 /* Add other assignments based on the table structure */ WHERE user_id = $1 RETURNING *;',
          [user_id, theme, language, receive_email_notifications, show_online_status /* Add other parameter values here */]
        );
      
        return toCamelCase(rows)[0];
      }

    //   ### Delete - works
    static async delete(user_id) {
        const { rows } = await pool.query('DELETE FROM userpreferences WHERE user_id = $1 RETURNING *;', [user_id]);
        return toCamelCase(rows)[0];
    }
}

module.exports = UserPreferenceRepo;
