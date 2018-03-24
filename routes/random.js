"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var database_1 = require("../database");
var morgan = require("morgan");
var router = express.Router();
exports.router = router;
router.use(morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms'));
router.get('/product', function (req, res) {
    var sql = "\n    SELECT product.id,\n    product.title,\n    brand.name,\n    product.imgSrc,\n    brand.logoSrc\n    FROM product\n    JOIN brand\n    ON product.brand_id = brand.id\n    ORDER BY RAND()\n    LIMIT 1";
    database_1.database.query(sql, function (err, rows, fields) {
        if (err) {
            console.error(err);
        }
        res.json(rows);
    });
});
router.get('/product/:number', function (req, res) {
    var sql = "\n    SELECT product.id AS id,\n    product.title AS title,\n    brand.name as brandName,\n    product.imgSrc as imgSource,\n    brand.logoSrc as logoSource\n    FROM product\n    JOIN brand\n    ON product.brand_id = brand.id\n    ORDER BY RAND()\n    LIMIT " + req.params.number;
    database_1.database.query(sql, function (err, rows, fields) {
        if (err) {
            console.error(err);
        }
        res.json(rows);
    });
});
