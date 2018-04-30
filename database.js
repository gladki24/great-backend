"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql2");
exports.database = mysql.createConnection({
    database: 'great_database',
    host: 'localhost',
    multipleStatements: true,
    password: 'OasisWonderwallGR8',
    user: 'great_backend',
});
//# sourceMappingURL=database.js.map