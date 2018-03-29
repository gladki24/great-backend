"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
var express = require("express");
var cors = require("cors");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var database_js_1 = require("./database.js");
var Product = require("./routes/product");
var Random = require("./routes/random");
var SmallTile = require("./routes/smallTile");
var Detail = require("./routes/detail");
var User = require("./routes/user");
var app = express();
// Config
app.use(cors());
app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/product', Product.router);
app.use('/random', Random.router);
app.use('/tile', SmallTile.router);
app.use('/detail', Detail.router);
app.use('/user', User.router);
app.use(morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms'));
// App start
app.listen(3000, function () {
    database_js_1.database.connect();
    console.log('Listen on 3000');
});
