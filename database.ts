import * as mysql from 'mysql2';

export const database = mysql.createConnection({
    database: 'great_database',
    host: 'localhost',
    multipleStatements: true,
    password: 'OasisWonderwallGR8',
    user: 'great_backend',
});
