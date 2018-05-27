import * as express from 'express';
import * as morgan from 'morgan';
import { database } from '../database';

const router = express.Router();

router.use(morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms'));

router.get('/:number/:brand/:category', (req, res) => {
   let sql = `SELECT product.id AS id,
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
   if (req.params.brand == 0) {
       sql = `SELECT product.id AS id,
        product.title AS title,
        brand.name as brandName,
        product.image_source as imgSource,
        brand.logo_source as logoSource
        FROM product
        JOIN brand
        ON product.brand_id = brand.id
        WHERE product.category_id = ${req.params.category}
        LIMIT ${req.params.number}`;
   }
   if (req.params.category == 0) {
       sql = `SELECT product.id AS id,
        product.title AS title,
        brand.name as brandName,
        product.image_source as imgSource,
        brand.logo_source as logoSource
        FROM product
        JOIN brand
        ON product.brand_id = brand.id
        WHERE brand.id = ${req.params.brand}
        LIMIT ${req.params.number}`;
   }
   if (req.params.category == 0 && req.params.brand == 0) {
       sql = `SELECT product.id AS id,
        product.title AS title,
        brand.name as brandName,
        product.image_source as imgSource,
        brand.logo_source as logoSource
        FROM product
        JOIN brand
        ON product.brand_id = brand.id
        LIMIT ${req.params.number}`;
   }
   database.query(sql, (err, rows, fields) => {
        if (err) {
            console.error(err);
            res.status(404).json(false);
        }
        res.status(200).json(rows);
    });
});

export { router };
