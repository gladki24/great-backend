"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var morgan = require("morgan");
var database_1 = require("../database");
var router = express.Router();
exports.router = router;
router.use(morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms'));
router.get('/:number/:brand/:category', function (req, res) {
    var sql = "SELECT product.id AS id,\n    product.title AS title,\n    brand.name as brandName,\n    product.imgSrc as imgSource,\n    brand.logoSrc as logoSource\n    FROM product\n    JOIN brand\n    ON product.brand_id = brand.id\n    WHERE brand.id = " + req.params.brand + "\n    AND product.category_id = " + req.params.category + "\n    LIMIT " + req.params.number;
    database_1.database.query(sql, function (err, rows, fields) {
        if (err) {
            console.error(err);
        }
        res.json(rows);
    });
});
router.get('/detail/:id', function (req, res) {
    var sql = "\n    SELECT product.title AS title,\n    product.price AS price,\n    product.imgSrc AS imgSource,\n    product.link AS link,\n    brand.name AS brandName,\n    brand.logoSrc AS logoSource,\n    category.name AS categoryName\n    FROM product\n    JOIN brand\n    ON product.brand_id = brand.id\n    JOIN category\n    ON product.category_id = category.id\n    WHERE product.id = \"" + req.params.id + "\"\n    ";
    database_1.database.query(sql, function (err, rows, fields) {
        if (err) {
            console.error(err);
        }
        res.json(rows);
    });
});
router.get('/brands', function (req, res) {
    var sql = "\n    SELECT\n    id,\n    name AS name,\n    logoSrc AS brandSource\n    FROM  brand\n    ";
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
