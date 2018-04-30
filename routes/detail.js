"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const morgan = require("morgan");
const database_1 = require("../database");
const router = express.Router();
exports.router = router;
router.use(morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms'));
router.get('/:id', (req, res) => {
    const sql = `
    SELECT product.title AS title,
    product.price AS price,
    product.image_source AS imgSource,
    product.link AS link,
    brand.name AS brandName,
    brand.logo_source AS logoSource,
    category.name AS categoryName
    FROM product
    JOIN brand
    ON product.brand_id = brand.id
    JOIN category
    ON product.category_id = category.id
    WHERE product.id = "${req.params.id}"
    `;
    database_1.database.query(sql, (err, rows, fields) => {
        if (err) {
            console.error(err);
        }
        res.json(rows);
    });
});
//# sourceMappingURL=detail.js.map