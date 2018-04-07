import * as express from 'express';
import * as morgan from 'morgan';
import { database } from '../database';

const router = express.Router();

router.use(morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms'));

router.get('/get/:id', (req, res) => {
    const sql = `SELECT
    product.id as id,
    product.title as title,
    product.imgSrc as imgSource,
    brand.name as brandName
    FROM product
    JOIN brand
    ON product.brand_id = brand.id
    JOIN collection_product
    ON product.id = collection_product.product_id
    JOIN collection
    ON collection_product.collection_id = collection.id
    WHERE collection.id = ${req.params.id};`;
    database.query(sql, (err, rows, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.json(rows);
        }
    });
});

router.post('/add', (req, res) => {
    const sql = `SELECT id
    FROM collection
    WHERE user_id = '${req.body.userId}'
    AND title = 'Moje zapisane produkty'`;
    database.query(sql, (err, rows, fields) => {
        if (err) { console.log(err); }
        const collectionId = rows[0].id;
        const sql2 = `INSERT INTO collection_product
        (product_id, collection_id)
        VALUES ('${req.body.productId}', '${collectionId}')`;
        database.query(sql2, (err2, rows2, fields2) => {
            if (err2) {
                console.log(err2);
                res.status(409).json(false);
            } else {
                res.status(200).json(true);
            }
        });
    });
});

export { router };
