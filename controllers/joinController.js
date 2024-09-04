const getJoin = (req, res) => {
  if (!req.user) {
    return res.redirect('/');
  }
  res.render('join');
};

const postJoin = (req, res) => {
  res.redirect('/');
};

module.exports = { getJoin, postJoin };
