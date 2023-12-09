/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE shirts (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      des VARCHAR(400),
      brand VARCHAR(30),
      title VARCHAR(30) NOT NULL
    );
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE shirts;
  `);
};