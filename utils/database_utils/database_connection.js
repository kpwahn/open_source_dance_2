let mysql = require('mysql');

let connection = mysql.createPool({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'root',
    database : 'open_source_dance'
});

module.exports = connection;
