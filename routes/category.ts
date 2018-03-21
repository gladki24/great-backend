import * as express from 'express';
import { database } from '../database';
import * as morgan from 'morgan';
import { createCategoryQuery } from './util';

const router = express.Router();
router.use(morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms'));
// Brands products
router.get('/:category/:number', (req, res) => {
    const sql = `SELECT SELECT product.id AS , product.title, brand.name, product.imgSrc, brand.logoSrc
    FROM product
    JOIN brand
    ON product.brand_id = brand.id
    ORDER BY RAND()
    LIMIT ${req.params.number}`;
    database.query(sql, (err, rows, fields) => {
        res.json(rows);
    });
});

// Export
export { router };
