import * as express from 'express';
import { database } from '../database';
import * as morgan from 'morgan';

const router = express.Router();

router.use(morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms'));

router.get('/product', (req, res) => {
    const sql = `
    SELECT product.id,
    product.title,
    brand.name,
    product.imgSrc,
    brand.logoSrc
    FROM product
    JOIN brand
    ON product.brand_id = brand.id
    ORDER BY RAND()
    LIMIT 1`;
    database.query(sql, (err, rows, fields) => {
        if (err) { console.error(err); }
        res.json(rows);
    });
});

router.get('/product/:number', (req, res) => {
    const sql = `
    SELECT product.id AS id,
    product.title AS title,
    brand.name as brandName,
    product.imgSrc as imgSource,
    brand.logoSrc as logoSource
    FROM product
    JOIN brand
    ON product.brand_id = brand.id
    ORDER BY RAND()
    LIMIT ${req.params.number}`;
    database.query(sql, (err, rows, fields) => {
        if (err) { console.error(err); }
        res.json(rows);
    });
});

export { router };