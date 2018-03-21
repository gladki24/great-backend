import * as express from 'express';
import * as morgan from 'morgan';
import { database } from '../database';

const router = express.Router();

router.use(morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms'));

router.get('/:number/:brand/:category', (req, res) => {
   const sql = `SELECT product.id AS id,
    product.title AS title,
    brand.name as brandName,
    product.imgSrc as imgSource,
    brand.logoSrc as logoSource
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

router.get('/detail/:id', (req, res) => {
    const sql = `
    SELECT product.title AS title,
    product.price AS price,
    product.imgSrc AS imgSource,
    product.link AS link,
    brand.name AS brandName,
    brand.logoSrc AS logoSource,
    category.name AS categoryName
    FROM product
    JOIN brand
    ON product.brand_id = brand.id
    JOIN category
    ON product.category_id = category.id
    WHERE product.id = "${req.params.id}"
    `;
    database.query(sql, (err, rows, fields) => {
        if (err) { console.error(err); }
        res.json(rows);
    });
});

router.get('/brands', (req, res) => {
    const sql = `
    SELECT
    id,
    name AS name,
    logoSrc AS brandSource
    FROM  brand
    `;
    database.query(sql, (err, rows, fields) => {
       if (err) { console.error(err) }
       res.json(rows);
    });
});

router.get('/categories', (req, res) => {
    const sql = `
    SELECT
    id,
    pl_name AS name
    FROM category
    `;
    database.query(sql, (err, rows, fields) => {
        if (err) { console.error(err) }
        res.json(rows);
    });
});

export { router };
