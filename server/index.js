const express = require('express');
const config = require('./config');
const path = require('path');
const app = express();
var bodyParser = require('body-parser')
const router = express.Router();
var cors = require('cors');
var MainHandler = require('./handlers/MainHandler');

main();

function getArray(obj) {
    if (obj === undefined) {
        return [];
    }
    if (Array.isArray(obj)) {
        return obj;
    }
    try {
        var rt = JSON.parse(obj);
        return rt;
    } catch (err) {
        console.error('getArray json parse error:', err);
    }
    return obj;
}

async function main() {
 
    var mainHandler = new MainHandler();

    app.use(cors());

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    // parse application/json
    app.use(bodyParser.json());

    var RespObj = function (success, result) {
        if (success) {
            return {
                success,
                result
            }
        } else {
            return {
                success: false,
                error: result
            }
        }
    }

  
    router.get('/', function (req, res) {
        res.sendFile(path.join(__dirname + '/view/index.html'));
    });

    app.use(express.static(__dirname + '/view'));

    app.get('/programs', function (req, res) {
        mainHandler.getPrograms().then((result) => {
            res.send(new RespObj(true, result));
        }).catch((err) => {
            res.send(new RespObj(false, err));
        });
    })

    app.get('/orders', function (req, res) {
        mainHandler.getOrders().then((result) => {
            res.send(new RespObj(true, result));
        }).catch((err) => {
            res.send(new RespObj(false, err));
        });
    })

    app.post('/orderProgram', function (req, res) {
        mainHandler.orderProgram(req.body).then((result) => {
            res.send(new RespObj(true, result));
        }).catch((err) => {
            res.send(new RespObj(false, err));
        });
    });

    app.get('/version', function (req, res) {
        mainHandler.getVersion().then((result) => {
            res.send(new RespObj(true, result));
        }).catch((err) => {
            res.send(new RespObj(false, err));
        });
    });

    app.use('/', router);
    app.listen(config.port);
    console.log('Running on http://localhost:' + config.port);
}