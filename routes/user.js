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
            res.status(409).json(false);
        }
        else {
            res.status(204).json(true);
        }
    });
});
router.post('/login', function (req, res) {
    var sql = "\n    SELECT *\n    FROM user\n    WHERE '" + req.body.email + "' = email\n    AND '" + req.body.password + "' = password";
    database_1.database.query(sql, function (err, rows, fields) {
        if (err) {
            res.status(404).json(false);
        }
        else {
            res.status(200).json(rows);
        }
    });
});
