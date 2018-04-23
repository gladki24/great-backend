"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var morgan = require("morgan");
var database_1 = require("../database");
var router = express.Router();
exports.router = router;
router.use(morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms'));
router.get('/:id', function (req, res) {
    var sql = "\n    SELECT product.title AS title,\n    product.price AS price,\n    product.image_source AS imgSource,\n    product.link AS link,\n    brand.name AS brandName,\n    brand.logo_source AS logoSource,\n    category.name AS categoryName\n    FROM product\n    JOIN brand\n    ON product.brand_id = brand.id\n    JOIN category\n    ON product.category_id = category.id\n    WHERE product.id = \"" + req.params.id + "\"\n    ";
    database_1.database.query(sql, function (err, rows, fields) {
        if (err) {
            console.error(err);
        }
        res.json(rows);
    });
});
