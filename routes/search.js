"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const morgan = require("morgan");
const database_1 = require("../database");
const Enums_1 = require("../Util/Enums");
const router = express.Router();
exports.router = router;
router.use(morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms'));
router.get('/:number/:type/:query', (req, res) => {
    let sql;
    switch (parseInt(req.params.type, 0)) {
        case Enums_1.ESearchType.Name: {
            sql = `
            SELECT product.id AS id,
            product.title AS title,
            brand.name as brandName,
            product.image_source as imgSource,
            brand.logo_source as logoSource
            FROM product
            JOIN brand
            ON product.brand_id = brand.id
            WHERE product.title LIKE '%${req.params.query}%'
            LIMIT ${req.params.number}
            `;
            break;
        }
        case Enums_1.ESearchType.Tag: {
            sql = `
            SELECT DISTINCT product.id AS id,
            product.title AS title,
            brand.name as brandName,
            product.image_source as imgSource,
            brand.logo_source as logoSource
            FROM product
            JOIN brand
            ON product.brand_id = brand.id
            JOIN product_tag_user
            ON product.id = product_tag_user.product_id
            WHERE product_tag_user.tag_id LIKE '%${req.params.query}%'
            LIMIT ${req.params.number}
            `;
            break;
        }
    }
    database_1.database.query(sql, (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(404).json(false);
        }
        else {
            res.status(200).json(rows);
        }
    });
});
//# sourceMappingURL=search.js.map