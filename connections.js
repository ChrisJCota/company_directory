const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: 'password',
        database: 'workplace_db'
    },
);
db.connect(function (err) {
    if (err) throw err
    //console.log(`Connected to the workplace_db database.`);
    // promptUser()
});

module.exports = db;