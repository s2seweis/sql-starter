const pool = require('../pool/pool');
const toCamelCase = require('./utils/to-camel-case');

// represents a repository for interacting with a PostgreSQL database table named "Products."

class ProductsRepo {
    static async find() {
        const { rows } = await pool.query('SELECT * FROM Products;');

        return toCamelCase(rows);
    }

    static async findById(productid) {
        console.log("productid");
        const { rows } = await pool.query(
            `
      SELECT * FROM Products WHERE productid = $1;
      `,
            [productid]
        );

        return toCamelCase(rows)[0];
    }

    static async insert(ProductName, Price, Category) {
        const {
            rows,
        } = await pool.query(
            'INSERT INTO Products (ProductName, Price, Category) VALUES ($1, $2, $3) RETURNING * ;',
            [ProductName, Price, Category]
        );

        return toCamelCase(rows)[0];
    }

    static async update(user_id, bio, date_of_birth, location, website_url, profile_picture_url) {
        const {
            rows,
        } = await pool.query(
            'UPDATE Products SET bio = $2, date_of_birth = $3, location = $4, website_url = $5, profile_picture_url = $6 WHERE user_id = $1 RETURNING *;',
            [user_id, bio, date_of_birth, location, website_url, profile_picture_url]
        );

        return toCamelCase(rows)[0];
    }

    static async delete(user_id) {
        const { rows } = await pool.query('DELETE FROM Products WHERE user_id = $1 RETURNING *;', [user_id]);
        return toCamelCase(rows)[0];
    }
}

module.exports = ProductsRepo;
