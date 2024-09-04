const db = require('../db/queries');
const { body } = require('express-validator');

const validateMessage = [
  body('title').trim().escape('<>'),
  body('content').trim().escape('<>'),
];

const postNewMessage = [
  validateMessage,
  async (req, res) => {
    const message = {
      title: req.body.title,
      content: req.body.content,
      user: req.user.id,
    };
    await db.insertMessage(message);
    res.redirect('/');
  },
];

module.exports = { postNewMessage };
