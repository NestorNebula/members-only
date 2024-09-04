const getLogin = (req, res) => {
  req.user ? res.redirect('/') : res.render('log-in');
};

module.exports = { getLogin };
