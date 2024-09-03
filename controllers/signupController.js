function getSignup(req, res) {
  res.render('sign-up');
}

function postSignUp(req, res) {
  res.redirect('/');
}

module.exports = { getSignup, postSignUp };
