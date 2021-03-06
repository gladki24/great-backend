"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const morgan = require("morgan");
const database_1 = require("../database");
const router = express.Router();
exports.router = router;
router.use(morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms'));
router.get('/get/:id', (req, res) => {
    const sql = `
   SELECT tag.id as id,
   COUNT(product_tag_user.user_id) as number
   FROM tag
   JOIN product_tag_user
   ON tag.id = product_tag_user.tag_id
   WHERE product_tag_user.product_id = '${req.params.id}'
   GROUP BY tag_id
   ORDER BY COUNT(product_tag_user.user_id) DESC
   `;
    database_1.database.query(sql, (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(409).json(false);
        }
        else {
            res.status(200).json(rows);
        }
    });
});
router.post('/add', (req, res) => {
    const sql = `
    SELECT *
    FROM tag
    WHERE id = '${req.body.tag}'
    `;
    database_1.database.query(sql, (err, rows, fields) => {
        let sql2;
        if (rows[0]) {
            sql2 = `
            INSERT INTO product_tag_user
            (product_id, tag_id, user_id)
            VALUES
            ('${req.body.product}','${req.body.tag}','${req.body.user}')
            `;
        }
        else {
            sql2 = `
            INSERT INTO tag
            (id)
            VALUES
            ('${req.body.tag}');
            INSERT INTO product_tag_user
            (product_id, tag_id, user_id)
            VALUES
            ('${req.body.product}','${req.body.tag}','${req.body.user}')
            `;
        }
        database_1.database.query(sql2, (err2, rows2, fields2) => {
            if (err) {
                console.log(err2);
                res.status(409).json(false);
            }
            else {
                res.status(200).json(true);
            }
        });
    });
});
router.post('/vote', (req, res) => {
    const sql = `
    INSERT INTO product_tag_user
    (product_id, tag_id, user_id)
    VALUES
    ('${req.body.product}','${req.body.tag}','${req.body.user}')
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
//# sourceMappingURL=tag.js.map