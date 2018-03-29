// Imports
import * as express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import { database } from './database.js';
import * as Product from './routes/product';
import * as Random from './routes/random';
import * as SmallTile from './routes/smallTile';
import * as Detail from './routes/detail';
import * as User from './routes/user';

const app = express();
// Config
app.use(cors());
app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/product', Product.router);
app.use('/random', Random.router);
app.use('/tile', SmallTile.router);
app.use('/detail', Detail.router);
app.use('/user', User.router);

app.use(morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms'));

// App start
app.listen(3000, () => {
    database.connect();
    console.log('Listen on 3000');
});
