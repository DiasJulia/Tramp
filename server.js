// server.js
var http = require("http");

const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const CoinRouter = require('./routes/CoinRouter');
const alertnode = require('alert-node')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('views'));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', CoinRouter);
app.use("/post", CoinRouter);

//database
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin123@cluster-trampme-dqevg.gcp.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(uri, (err, client) => {
    if (err) return console.log(err);
    db = client.db('TrampMe');

    app.listen(port, () => {
        console.log("O server tá ouvindo a porta 3000");
    });
})

app.post('/cadastro', (req, res) => {
    db.collection('Cliente').save(req.body, (err, result) => {
        if (err) return console.log(err);

        console.log("Está salvo no database");
        res.redirect('/');
    });
});

app.post('/cadastro2', (req, res) => {
    db.collection('Prestador').save(req.body, (err, result) => {
        if (err) return console.log(err);

        console.log("Está salvo no database");
        res.redirect('/');
    });
});


app.get('/login', (req, res) => {
    let cursor = db.collection('Cliente').find();
});

app.post('/login', (req, res) => {
    db.collection('Cliente').find().toArray((err, results) => {
        for (let i = 0; i < results.length; i++) {
            if (results[i].email === req.body.email && results[i].senha === req.body.senha) {
                console.log("Bem vindo, " + results[i].nome);
                res.redirect('/');
                break;
            }
            if (i = results.length) {
                console.log("Usuário e/ou senha não compatíveis. Por favor verifique o que foi digitado.");
                res.redirect("/404");
            }
        }
    })
    app.post('/voltar', (req, res) => {
        res.redirect('/login')
    })
});