"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var morgan = require("morgan");
var database_1 = require("../database");
var router = express.Router();
exports.router = router;
router.use(morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms'));
router.get('/brand/:brand/:number', function (req, res) {
    var sql = "SELECT product.id AS id,\n    product.title AS title,\n    brand.name as brandName,\n    product.images_source as imgSource,\n    brand.logo_source as logoSource\n    FROM product\n    JOIN brand\n    ON product.brand_id = brand.id\n    WHERE brand.id = " + req.params.brand + "\n    LIMIT " + req.params.number;
    database_1.database.query(sql, function (err, rows, fields) {
        if (err) {
            console.error(err);
        }
        res.json(rows);
    });
});
router.get('/category/:category/:number', function (req, res) {
    var sql = "SELECT product.id AS id,\n    product.title AS title,\n    brand.name as brandName,\n    product.image_source as imgSource,\n    brand.logo_source as logoSource\n    FROM product\n    JOIN brand\n    ON product.brand_id = brand.id\n    WHERE product.category_id = " + req.params.category + "\n    LIMIT " + req.params.number;
    database_1.database.query(sql, function (err, rows, fields) {
        if (err) {
            console.error(err);
        }
        res.json(rows);
    });
});
router.get('/:number/:brand/:category', function (req, res) {
    var sql = "SELECT product.id AS id,\n    product.title AS title,\n    brand.name as brandName,\n    product.image_source as imgSource,\n    brand.logo_source as logoSource\n    FROM product\n    JOIN brand\n    ON product.brand_id = brand.id\n    WHERE brand.id = " + req.params.brand + "\n    AND product.category_id = " + req.params.category + "\n    LIMIT " + req.params.number;
    database_1.database.query(sql, function (err, rows, fields) {
        if (err) {
            console.error(err);
        }
        res.json(rows);
    });
});
