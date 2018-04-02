"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql2");
exports.database = mysql.createConnection({
    database: 'gr8_database',
    host: 'localhost',
    multipleStatements: true,
    password: 'OasisWonderwallGR8',
    user: 'gr8',
});
