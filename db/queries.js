const pool = require('./pool');

async function getUser(email) {
  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [
    email,
  ]);
  const user = rows[0];
  return user;
}

module.exports = { getUser };
