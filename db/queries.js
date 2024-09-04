const pool = require('./pool');

async function getUser(email) {
  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [
    email,
  ]);
  const user = rows[0];
  return user;
}

async function getUserById(id) {
  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  const user = rows[0];
  return user;
}

async function insertUser(user) {
  await pool.query(
    'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)',
    [user.first_name, user.last_name, user.email, user.password]
  );
}

module.exports = { getUser, getUserById, insertUser };
