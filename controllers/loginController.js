const getLogin = (req, res) => {
  req.user
    ? res.redirect('/')
    : res.render('log-in', { error: req.flash('error') });
};

module.exports = { getLogin };
