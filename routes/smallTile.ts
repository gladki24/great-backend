import * as express from 'express';
import * as morgan from 'morgan';
import {database} from '../database';

const router = express.Router();
router.use(morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms'));

router.get('/brands', (req, res) => {
    const sql = `
    SELECT
    id,
    name AS name,
    logo_source AS imgSource
    FROM  brand
    `;
    database.query(sql, (err, rows, fields) => {
        if (err) { console.error(err); }
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
    database.query(sql, (err, rows, fields) => {
        if (err) { console.error(err); }
        res.json(rows);
    });
});

export { router };
