module.exports.iniciaChat = (application, req, res) => {

    let dados = req.body;

    req.assert('apelido', 'Nome ou apelido é obrigatório').notEmpty()
    req.assert('apelido', 'Nome ou apelido deve conter entre 3 e 15 caracteres').len(3, 15)

    let erros = req.validationErrors()

    if (erros) {
        res.render("index", {
            validacao: erros,
            apelido: req.body.apelido
        })
        return
    }
    res.render("chat")
}