const express = require('express');
const connection = require('./database/connection');

const routes = express.Router();

routes.get('/libries', async (req, res) => {
    const libries = await connection('libries').select('*');
    return res.json(libries);
});

routes.get('/libries/user/:id', async (req, res) => {
    const id = req.params.id;

    const libries = await connection('libries').where('id_user', id).select('*');
    return res.json(libries);
});

routes.get('/libries/:id', async (req, res) => {
    const id = req.params.id;

    const libries = await connection('libries').where('id', id).select('*');
    return res.json(libries);
});

routes.post('/libries', async (req, res) => {;
    const {id_user, autor, expressao, url_expressao, condicao} = req.body;
    try {
        await connection('libries').insert({
            id_user,
            autor,
            expressao,
            url_expressao,
            condicao
        });
    } catch (err) {
        return res.json(err);
    }
    return res.json("Cadastro feito com Sucesso!");
});

routes.put('/libries/:id', async (req, res) => {
    const id = req.params.id;
    const {id_user, autor, expressao, condicao, url_expressao} = req.body;
    try {
        await connection('libries').where('id', id)
        .update({
            expressao,
            url_expressao,
        });
    } catch (err) {
        return res.json(err);
    }
    return res.json("Alterado com Sucesso!");
});

routes.put('/libries/admin/:id', async (req, res) => {
    const id = req.params.id;
    const {id_user, autor, expressao, condicao, url_expressao} = req.body;
    try {
        await connection('libries').where('id', id)
        .update({
            condicao
        });
    } catch (err) {
        return res.json(err);
    }
    return res.json("Alterado com Sucesso!");
});

routes.delete('/libries/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await connection('libries').where('id', id)
        .del()
    } catch (err) {
        return res.json(err);
    }
    return res.json("Deletado com Sucesso!");
});

module.exports = routes;