const bcrypt = require('bcrypt');
const pool = require('../pool/pool'); // Import the shared pool
const toCamelCase = require('./utils/to-camel-case');
const jwt = require('jsonwebtoken');

class AuthRepo {
 
// works
  async getUserByEmail(email) {
    const { rows } = await pool.query(
      `
      SELECT * FROM "users" WHERE email = $1;
      `,
      [email]
    );
  
    return toCamelCase(rows)[0] || null;
  }
//  works
  async registerUser({ username, email, full_name, profile_picture_url, password }) {
    try {
      const passwordHash = await bcrypt.hash(password, 10);
  
      const userInsertQuery = `
        INSERT INTO "users" (username, email, full_name, profile_picture_url)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;
  
      const userResult = await pool.query(userInsertQuery, [username, email, full_name, profile_picture_url]);
  
      const authInsertQuery = `
        INSERT INTO "authentication" (user_id, password_hash)
        VALUES ($1, $2)
        RETURNING *;
      `;
  
      const authResult = await pool.query(authInsertQuery, [userResult.rows[0].user_id, passwordHash]);
  
      return toCamelCase(userResult.rows)[0];
    } catch (error) {
      // Handle errors here
      console.error('Error registering user:', error);
      throw error; // Rethrow the error for the calling code to handle
    }
  }

  // now here
  async loginUser({ email, password }) {
    try {
      const user = await this.getUserByEmail(email);

      if (!user) {
        throw new Error('Invalid email or password');
      }

      const authQuery = `
        SELECT * FROM "authentication" WHERE user_id = $1;
      `;

      const authResult = await pool.query(authQuery, [user.user_id]);

      if (authResult.rows.length === 0) {
        throw new Error('Invalid email or password');
      }

      const passwordMatch = await bcrypt.compare(password, authResult.rows[0].password_hash);

      if (!passwordMatch) {
        throw new Error('Invalid email or password');
      }

      const token = jwt.sign({ user_id: user.user_id, email: user.email }, '12345678', { expiresIn: '1h' });

      return { message: 'Login successful', token };
    } catch (error) {
      console.error('Error logging in user:', error);
      throw error;
    }
  }

  // ... other authentication-related methods ...
}

module.exports = new AuthRepo();
