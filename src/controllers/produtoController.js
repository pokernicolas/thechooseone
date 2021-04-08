//Define a utilização do model cliente e a dependência http-status
const Produto = require('../models/produto');
const status = require('http-status');

//Cria o método Insert, obtendo os dados da request
exports.Insert = (req, res, next) => {
    const nome = req.body.nome;
    const tipoProduto = req.body.tipoProduto;
    const preco = req.body.preco;
    const estoque = req.body.estoque;

    //Popula cada um dos campos do model com os campos recebidos na quest
Produto.create({
    nome: nome,
    tipoProduto: tipoProduto,
    preco: preco,
    estoque: estoque,
})

.then(produto => {
    if (produto) {
        res.status(status.ok).send(produto);
    } else {
        res.status(status.NOT_FOUND).send();
    }
})

.catch(error => next(error));
};

exports.SelectAll = (req, res, next) => {
    Produto.findAll()
        .then(produto => {
            if (produto) {
                res.status(status.OK).send(produto);
            }
        })
        .catch(error => next(error));
}

exports.SelectDetail = (req, res, next) => {
    const id = req.params.id;

    Produto.findByPk(id)
        .then(produto => {
            if (produto) {
                res.status(status.OK).send(produto);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};

exports.Update = (req, res, next) => {
    const id = req.params.id;
    const nome = req.body.nome;
    const tipoProduto = req.body.tipoProduto;
    const preco = req.body.preco;
    const estoque = req.body.estoque;

    Produto.findByPk(id)
        .then(produto => {
            if (produto) {
                produto.update({
                    nome: nome,
                    tipoProduto: tipoProduto,
                    preco: preco,
                    estoque: estoque,
                },
                    {
                        where: { id: id}
                })
                .then(() => {
                    res.status(status.OK).send();
                })
                .catch(error => next(error));
        } else {
            res.status(status.NOT_FOUND).send();
        }
    })
    .catch(error => next(error));
};

exports.Delete = (req, res, next) => {
const id = req.params.id;

Produto.findByPk(id)
    .then(produto => {
        if (produto) {
            produto.destroy({
                where: { id: id }
            })
                .then(() => {
                    res.status(status.OK).send();
                })
                .catch(error => next(error));
        }
        else {
            res.status(status.NOT_FOUND).send();
        }
    })
    .catch(error => next(error));
};