"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const database_1 = require("../database");
const morgan = require("morgan");
const router = express.Router();
exports.router = router;
router.use(morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms'));
router.get('/product', (req, res) => {
    const sql = `
    SELECT product.id,
    product.title,
    brand.name,
    product.image_source,
    brand.logo_source
    FROM product
    JOIN brand
    ON product.brand_id = brand.id
    ORDER BY RAND()
    LIMIT 1`;
    database_1.database.query(sql, (err, rows, fields) => {
        if (err) {
            console.error(err);
            res.status(404).json(false);
        }
        else {
            res.status(200).json(rows);
        }
    });
});
router.get('/product/:number', (req, res) => {
    const sql = `
    SELECT product.id AS id,
    product.title AS title,
    brand.name as brandName,
    product.image_source as imgSource,
    brand.logo_source as logoSource
    FROM product
    JOIN brand
    ON product.brand_id = brand.id
    ORDER BY RAND()
    LIMIT ${req.params.number}`;
    database_1.database.query(sql, (err, rows, fields) => {
        if (err) {
            console.error(err);
            res.status(404).json(false);
        }
        else {
            res.status(200).json(rows);
        }
    });
});
//# sourceMappingURL=random.js.map