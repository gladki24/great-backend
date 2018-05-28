import * as express from 'express';
import * as morgan from 'morgan';
import { database } from '../database';

const router = express.Router();

router.use(morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms'));

router.get('/:id', (req, res) => {
    const sql = `
    SELECT product.title AS title,
    product.price AS price,
    product.image_source AS imgSource,
    product.link AS link,
    brand.name AS brandName,
    brand.logo_source AS logoSource,
    category.polish_name AS categoryName
    FROM product
    JOIN brand
    ON product.brand_id = brand.id
    JOIN category
    ON product.category_id = category.id
    WHERE product.id = "${req.params.id}"
    `;
    database.query(sql, (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(404).json(rows);
        } else {
            res.status(200).json(rows);
        }
    });
});

export { router };
