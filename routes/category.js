"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var database_1 = require("../database");
var morgan = require("morgan");
var router = express.Router();
exports.router = router;
router.use(morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms'));
// Brands products
router.get('/:category/:number', function (req, res) {
    var sql = "SELECT SELECT product.id AS , product.title, brand.name, product.imgSrc, brand.logoSrc\n    FROM product\n    JOIN brand\n    ON product.brand_id = brand.id\n    ORDER BY RAND()\n    LIMIT " + req.params.number;
    database_1.database.query(sql, function (err, rows, fields) {
        res.json(rows);
    });
});
