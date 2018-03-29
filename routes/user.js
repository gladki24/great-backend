"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var morgan = require("morgan");
var database_1 = require("../database");
var router = express.Router();
exports.router = router;
router.use(morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms'));
router.post('/add', function (req, res) {
    var id = req.body.email.replace('@', '');
    var sql = "\n   INSERT INTO user\n   (id, email, nick, password, birth_date)\n   VALUES\n   ('" + id + "','" + req.body.email + "', '" + req.body.nick + "', '" + req.body.password + "', '" + req.body.birth + "')";
    database_1.database.query(sql, function (err, rows, fields) {
        if (err) {
            console.error(err);
            res.json('Error! User does not added');
        }
        else {
            res.json('User added!');
        }
    });
});
