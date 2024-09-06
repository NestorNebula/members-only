const pool = require('./pool');

// Users Queries

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

async function updateMemberStatus(user) {
  await pool.query('UPDATE users SET member = true WHERE id = $1', [user.id]);
}

async function updateAdminStatus(user) {
  await pool.query('UPDATE users SET admin = true WHERE id = $1', [user.id]);
}

async function insertUser(user) {
  await pool.query(
    'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)',
    [user.first_name, user.last_name, user.email, user.password]
  );
}

// Messages Queries

async function getAllMessages() {
  const { rows } = await pool.query(
    'SELECT m.id, title, timestamp, content, user_id, first_name, last_name FROM messages AS m INNER JOIN users AS u ON m.user_id = u.id'
  );
  return rows;
}

async function insertMessage(message) {
  await pool.query(
    'INSERT INTO messages (title, content, user_id) VALUES ($1, $2, $3)',
    [message.title, message.content, message.user]
  );
}

module.exports = {
  getUser,
  getUserById,
  updateMemberStatus,
  updateAdminStatus,
  insertUser,
  getAllMessages,
  insertMessage,
};
