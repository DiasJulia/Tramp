const express = require('express');
const CoinRouter = express.Router();
let user = require("../models/User.js")

CoinRouter.route('/').get(function(req, res) {
    res.render('index');
});

CoinRouter.route('/cadastro').get(function(req, res) {
    res.render('cadastro');
});

CoinRouter.route('/cadastro2').get(function(req, res) {
    res.render('cadastro2');
});

CoinRouter.route('/login').get(function(req, res) {
    res.render('login');
});

CoinRouter.route('/create').get(function(req, res) {
    res.render('create');
});

CoinRouter.route('/servicos').get(function(req, res) {
    res.render('servicos');
});

CoinRouter.route('/404').get(function(req, res){
    res.render('404');
})

CoinRouter.route('/voltar').get(function(req, res){
    res.render('login');
})

const Coin = require('../models/Coin.model');;

module.exports = CoinRouter;