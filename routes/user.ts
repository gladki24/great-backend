import * as express from 'express';
import * as morgan from 'morgan';
import {database} from '../database';

const router = express.Router();
router.use(morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms'));

router.post('/add', (req, res) => {
    const id = req.body.email.replace('@', '');
    const sql = `
   INSERT INTO user
   (id, email, nick, password, birth_date)
   VALUES
   ('${id}','${req.body.email}', '${req.body.nick}', '${req.body.password}', '${req.body.birth}')`;
    database.query(sql, (err, rows, fields) => {
        if (err) {
            res.status(409).json(false);
        } else {
            res.status(204).json(true);
        }
    });
});

router.post('/login', (req, res) => {
    const sql = `
    SELECT *
    FROM user
    WHERE '${req.body.email}' = email
    AND '${req.body.password}' = password`;
    database.query(sql, (err, rows, fields) => {
        if (err) {
            res.status(404).json(false);
        } else {
            res.status(200).json(rows);
        }
    });
});

export { router };
