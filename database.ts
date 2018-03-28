import * as mysql from 'mysql2';

export const database = mysql.createConnection({
    database: 'gr8_database',
    host: 'localhost',
    password: 'OasisWonderwallGR8',
    user: 'gr8',
});
