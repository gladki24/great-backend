import * as express from 'express';
import * as morgan from 'morgan';
import { database } from '../database';

const router = express.Router();

router.use(morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms'));

router.get('/brand/:brand/:number', (req, res) => {
    const sql = `SELECT product.id AS id,
    product.title AS title,
    brand.name as brandName,
    product.image_source as imgSource,
    brand.logo_source as logoSource
    FROM product
    JOIN brand
    ON product.brand_id = brand.id
    WHERE brand.id = ${req.params.brand}
    LIMIT ${req.params.number}`;
    database.query(sql, (err, rows, fields) => {
        if (err) { console.error(err); }
        res.json(rows);
    });
});

router.get('/category/:category/:number', (req, res) => {
    const sql = `SELECT product.id AS id,
    product.title AS title,
    brand.name as brandName,
    product.image_source as imgSource,
    brand.logo_source as logoSource
    FROM product
    JOIN brand
    ON product.brand_id = brand.id
    WHERE product.category_id = ${req.params.category}
    LIMIT ${req.params.number}`;
    database.query(sql, (err, rows, fields) => {
        if (err) { console.error(err); }
        res.json(rows);
    });
});

router.get('/:number/:brand/:category', (req, res) => {
   const sql = `SELECT product.id AS id,
    product.title AS title,
    brand.name as brandName,
    product.image_source as imgSource,
    brand.logo_source as logoSource
    FROM product
    JOIN brand
    ON product.brand_id = brand.id
    WHERE brand.id = ${req.params.brand}
    AND product.category_id = ${req.params.category}
    LIMIT ${req.params.number}`;
   database.query(sql, (err, rows, fields) => {
        if (err) { console.error(err); }
        res.json(rows);
    });
});

export { router };
