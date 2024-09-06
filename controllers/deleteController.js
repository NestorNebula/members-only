const db = require('../db/queries');

const postDeleteMessage = async (req, res) => {
  if (req.user.admin) {
    await db.deleteMessage(req.body.messageId);
  }
  res.redirect('/');
};
module.exports = { postDeleteMessage };
