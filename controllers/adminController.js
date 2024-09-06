require('dotenv').config();
const db = require('../db/queries');

const getAdmin = (req, res) => {
  if (!req.user || !req.user.member || req.user.admin) {
    return res.redirect('/');
  }
  res.render('admin');
};

const postAdmin = async (req, res) => {
  if (req.body.password === process.env.ADMIN) {
    await db.updateAdminStatus(req.user);
    return res.redirect('/');
  }
  res.render('admin', { error: 'This is not the expected password.' });
};

module.exports = { getAdmin, postAdmin };
