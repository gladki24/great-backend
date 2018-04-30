"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const morgan = require("morgan");
const database_1 = require("../database");
const router = express.Router();
exports.router = router;
router.use(morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms'));
router.get('/get/:id', (req, res) => {
    const sql = `SELECT
    collection.title as collectionTitle,
    product.id as id,
    product.title as title,
    product.image_source as imgSource,
    brand.name as brandName
    FROM product
    JOIN brand
    ON product.brand_id = brand.id
    JOIN collection_product
    ON product.id = collection_product.product_id
    JOIN collection
    ON collection_product.collection_id = collection.id
    WHERE collection.id = ${req.params.id};`;
    database_1.database.query(sql, (err, rows, fields) => {
        if (err) {
            console.error(err);
            res.json(false);
        }
        else {
            res.json(rows);
        }
    });
});
router.post('/addItem', (req, res) => {
    const sql = `SELECT id
    FROM collection
    WHERE user_id = '${req.body.userId}'
    AND title = 'Moje zapisane produkty'`;
    database_1.database.query(sql, (err, rows, fields) => {
        if (err) {
            console.log(err);
        }
        const collectionId = rows[0].id;
        const sql2 = `INSERT INTO collection_product
        (product_id, collection_id)
        VALUES ('${req.body.productId}', '${collectionId}')`;
        database_1.database.query(sql2, (err2, rows2, fields2) => {
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
router.post('/new', (req, res) => {
    const sql = `
   INSERT INTO collection
   (title, user_id)
   VALUES
   ('${req.body.name}', '${req.body.id}')
   `;
    database_1.database.query(sql, (err, rows, field) => {
        if (err) {
            console.log(err);
            res.status(409).json(false);
        }
        else {
            res.status(200).json(true);
        }
    });
});
router.post('/delete', (req, res) => {
    const sql = `DELETE FROM collection WHERE id = ${req.body.id}`;
    database_1.database.query(sql, (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(409).json(false);
        }
        else {
            res.status(200).json(true);
        }
    });
});
router.get('/title/:id', (req, res) => {
    const sql = `
    SELECT title
    FROM collection WHERE id = ${req.params.id}
    `;
    database_1.database.query(sql, (err, rows, fields) => {
        if (err) {
            console.log(err);
        }
        res.json(rows[0]);
    });
});
router.post('/add', (req, res) => {
    const sql = `
    INSERT INTO collection_product
    (product_id, collection_id)
    VALUES ('${req.body.productId}','${req.body.collectionId}')
    `;
    database_1.database.query(sql, (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(409).json(false);
        }
        else {
            res.status(200).json(true);
        }
    });
});
router.post('/remove', (req, res) => {
    const sql = `
    DELETE FROM collection_product
    WHERE
    collection_id = ${req.body.collectionId}
    AND
    product_id = '${req.body.productId}'`;
    database_1.database.query(sql, (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(409).json(false);
        }
        else {
            res.status(200).json(true);
        }
    });
});
//# sourceMappingURL=collection.js.map