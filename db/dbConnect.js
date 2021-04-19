const mysql = require("mysql");

    var connection = mysql.createPool({
        connectionLimit : 1000,
        connectTimeout  : 60 * 60 * 1000,
        acquireTimeout  : 60 * 60 * 1000,
        timeout         : 60 * 60 * 1000,
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'libraryms',
        multipleStatements: true
    });

module.exports = connection;
