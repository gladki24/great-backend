"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var morgan = require("morgan");
var database_1 = require("../database");
var router = express.Router();
exports.router = router;
router.use(morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms'));
router.get('/brands', function (req, res) {
    var sql = "\n    SELECT\n    id,\n    name AS name,\n    logoSrc AS imgSource\n    FROM  brand\n    ";
    database_1.database.query(sql, function (err, rows, fields) {
        if (err) {
            console.error(err);
        }
        res.json(rows);
    });
});
router.get('/categories', function (req, res) {
    var sql = "\n    SELECT\n    id,\n    pl_name AS name\n    FROM category\n    ";
    database_1.database.query(sql, function (err, rows, fields) {
        if (err) {
            console.error(err);
        }
        res.json(rows);
    });
});
