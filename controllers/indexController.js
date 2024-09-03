function getIndexPage(req, res) {
  res.render('index', { title: 'The Club' });
}

module.exports = { getIndexPage };
