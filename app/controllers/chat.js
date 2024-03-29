const iniciaChat = (application, req, res) => {
  let dados = req.body;

  const { apelido } = dados;

  req.assert("apelido", "Nome ou apelido é obrigatório").notEmpty();
  req
    .assert("apelido", "Nome ou apelido deve conter entre 3 e 15 caracteres")
    .len(3, 15);

  let erros = req.validationErrors();

  if (erros) {
    res.render("index", {
      validacao: erros,
      apelido,
    });
    return;
  }

  application.get("io").emit("msgParaCliente", {
    apelido,
    mensagem: ` acabou de entrar no chat`,
  });

  res.render("chat", {
    dados,
  });
};

module.exports = { iniciaChat };
