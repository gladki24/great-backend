"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const morgan = require("morgan");
const database_1 = require("../database");
const router = express.Router();
exports.router = router;
router.use(morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms'));
router.get('/brands', (req, res) => {
    const sql = `
    SELECT
    id,
    name AS name,
    logo_source AS imgSource
    FROM  brand
    `;
    database_1.database.query(sql, (err, rows, fields) => {
        if (err) {
            console.error(err);
        }
        res.json(rows);
    });
});
router.get('/categories', (req, res) => {
    const sql = `
    SELECT
    id,
    polish_name AS name
    FROM category
    `;
    database_1.database.query(sql, (err, rows, fields) => {
        if (err) {
            console.error(err);
        }
        res.json(rows);
    });
});
//# sourceMappingURL=smallTile.js.map