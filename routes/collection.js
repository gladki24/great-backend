"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var morgan = require("morgan");
var database_1 = require("../database");
var router = express.Router();
exports.router = router;
router.use(morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms'));
router.get('/get/:id', function (req, res) {
    var sql = "SELECT\n    collection.title as collectionTitle,\n    product.id as id,\n    product.title as title,\n    product.imgSrc as imgSource,\n    brand.name as brandName\n    FROM product\n    JOIN brand\n    ON product.brand_id = brand.id\n    JOIN collection_product\n    ON product.id = collection_product.product_id\n    JOIN collection\n    ON collection_product.collection_id = collection.id\n    WHERE collection.id = " + req.params.id + ";";
    database_1.database.query(sql, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.json(false);
        }
        else {
            res.json(rows);
        }
    });
});
router.post('/addItem', function (req, res) {
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
router.post('/new', function (req, res) {
    var sql = "\n   INSERT INTO collection\n   (title, user_id)\n   VALUES\n   ('" + req.body.name + "', '" + req.body.id + "')\n   ";
    database_1.database.query(sql, function (err, rows, field) {
        if (err) {
            console.log(err);
            res.status(409).json(false);
        }
        else {
            res.status(200).json(true);
        }
    });
});
router.post('/delete', function (req, res) {
    var sql = "DELETE FROM collection WHERE id = " + req.body.id;
    database_1.database.query(sql, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.status(409).json(false);
        }
        else {
            res.status(200).json(true);
        }
    });
});
router.get('/title/:id', function (req, res) {
    var sql = "\n    SELECT title\n    FROM collection WHERE id = " + req.params.id + "\n    ";
    database_1.database.query(sql, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.json(rows[0]);
        }
        else {
            res.json(rows[0]);
        }
    });
});
