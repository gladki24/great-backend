// Imports
import * as express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';
import { database } from './database.js';
import * as Category from './routes/category';
import * as Default from './routes/default';
import * as Random from './routes/random';

const app = express();
// Config
app.use(cors());
app.use(express.static('./public'));
app.use('/default', Default.router);
app.use('/category', Category.router);
app.use('/random', Random.router);
app.use(morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms'));
// Test
app.get('/', (req, res) => {
    const query = 'SELECT * FROM product';
    database.query(query, (err, rows, fields) => {
        if (err) {throw err; }
        res.json(rows[7]);
    });
});
// App start
app.listen(3000, () => {
    database.connect();
    console.log('Listen on 3000');
});
