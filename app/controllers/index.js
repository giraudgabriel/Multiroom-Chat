const home = (_application, _req, res) => {
  res.render("index", { validacao: [], apelido: null });
};

module.exports = { home };
