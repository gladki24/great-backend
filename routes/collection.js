"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var morgan = require("morgan");
var database_1 = require("../database");
var router = express.Router();
exports.router = router;
router.use(morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms'));
router.get('/get/:id', function (req, res) {
    var sql = "SELECT\n    product.id as id,\n    product.title as title,\n    product.imgSrc as imgSource,\n    brand.name as brandName\n    FROM product\n    JOIN brand\n    ON product.brand_id = brand.id\n    JOIN collection_product\n    ON product.id = collection_product.product_id\n    JOIN collection\n    ON collection_product.collection_id = collection.id\n    WHERE collection.id = " + req.params.id + ";";
    database_1.database.query(sql, function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(rows);
        }
    });
});
router.post('/add', function (req, res) {
    var sql = "SELECT id\n    FROM collection\n    WHERE user_id = '" + req.body.userId + "'\n    AND title = 'Moje zapisane produkty'";
    database_1.database.query(sql, function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        var collectionId = rows[0].id;
        var sql2 = "INSERT INTO collection_product\n        (product_id, collection_id)\n        VALUES ('" + req.body.productId + "', '" + collectionId + "')";
        database_1.database.query(sql2, function (err2, rows2, fields2) {
            if (err2) {
                console.log(err2);
                res.status(409).json(false);
            }
            else {
                res.status(200).json(true);
            }
        });
    });
});
