const db = require('../db/queries');

async function getIndexPage(req, res) {
  const messages = await db.getAllMessages();
  res.render('index', { title: 'The Club', messages });
}

module.exports = { getIndexPage };
