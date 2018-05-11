"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const database_js_1 = require("./database.js");
const Product = require("./routes/product");
const Random = require("./routes/random");
const SmallTile = require("./routes/smallTile");
const Detail = require("./routes/detail");
const User = require("./routes/user");
const Collection = require("./routes/collection");
const app = express();
// Config
app.use(cors());
app.use(helmet());
app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/product', Product.router);
app.use('/random', Random.router);
app.use('/tile', SmallTile.router);
app.use('/detail', Detail.router);
app.use('/user', User.router);
app.use('/collection', Collection.router);
app.use(morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms'));
// App start
app.listen(3000, () => {
    database_js_1.database.connect();
    console.log('Listen on 3000');
});
//# sourceMappingURL=index.js.map