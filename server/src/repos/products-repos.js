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

    static async update(productid, productname, price, category) {
        const {
            rows,
        } = await pool.query(
            'UPDATE Products SET productname = $2, price = $3, category = $4 WHERE productid = $1 RETURNING *;',
            [productid, productname, price, category]
        );

        return toCamelCase(rows)[0];
    }

    static async delete(productid) {
        const { rows } = await pool.query('DELETE FROM Products WHERE productid = $1 RETURNING *;', [productid]);
        return toCamelCase(rows)[0];
    }
}

module.exports = ProductsRepo;
