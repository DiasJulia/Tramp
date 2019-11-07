// server.js
var http = require("http");

const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const CoinRouter = require('./routes/CoinRouter');

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

app.post('/login', (req, res) => {
    db.collection('data').save(req.body, (err, result) => {
        if (err) return console.log(err);

        console.log("Está salvo no database");
        res.redirect('/');
    });
});