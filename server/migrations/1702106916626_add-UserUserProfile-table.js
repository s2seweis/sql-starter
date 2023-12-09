/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE IF NOT EXISTS UserUserProfile (
        user_id INT REFERENCES "users"(user_id) ON DELETE CASCADE,
        profile_id INT REFERENCES UserProfile(profile_id) ON DELETE CASCADE,
        PRIMARY KEY (user_id, profile_id)
    );
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE UserUserProfile;
  `);
};