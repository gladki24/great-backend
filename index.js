"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
var express = require("express");
var cors = require("cors");
var morgan = require("morgan");
var database_js_1 = require("./database.js");
var Category = require("./routes/category");
var Default = require("./routes/default");
var Random = require("./routes/random");
var app = express();
// Config
app.use(cors());
app.use(express.static('./public'));
app.use('/default', Default.router);
app.use('/category', Category.router);
app.use('/random', Random.router);
app.use(morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms'));
// Test
app.get('/', function (req, res) {
    var query = 'SELECT * FROM product';
    database_js_1.database.query(query, function (err, rows, fields) {
        if (err) {
            throw err;
        }
        res.json(rows[7]);
    });
});
// App start
app.listen(3000, function () {
    database_js_1.database.connect();
    console.log('Listen on 3000');
});
