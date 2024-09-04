require('dotenv').config();
const db = require('../db/queries');

const getJoin = (req, res) => {
  if (!req.user) {
    return res.redirect('/');
  }
  res.render('join');
};

const postJoin = async (req, res) => {
  if (req.body.password === process.env.CLUB_PASSWORD) {
    await db.updateMemberStatus(req.user);
    return res.redirect('/');
  }
  res.render('join', { error: 'This is not the expected password.' });
};

module.exports = { getJoin, postJoin };
