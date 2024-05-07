// db.js
const mysql = require('mysql2');

const Db = mysql.createConnection({
    // For Local 
    host: 'localhost',
    user: 'root',
    password: 'Kuldeep*2001',
    database: 'kuldeep_users'
});

(async () => {
    try {
        await Db.connect();
        console.log('MySQL connected');
    } catch (err) {
        console.error('Error connecting to MySQL:', err);
    }
})();

module.exports = Db;
