const mysql = require('mysql');
const fs = require('fs');
const path = require('path');

const dbConfig = {
    host: "localhost",
    user: "root",
    password: "12345",
    multipleStatements: true
};

const connection = mysql.createConnection(dbConfig);

const sqlPath = path.join(__dirname, '../database.sql');
const sqlFile = fs.readFileSync(sqlPath, 'utf8');

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL server.');

    // Remove lines that might cause syntax errors or are specific to interactive tools
    // The original file has "use Restaurant_Reservation_System;" which is fine if we create it first.
    // But we need to create the DB first.

    // We'll split the file by semicolons to execute statements, or just run the whole thing if the driver supports it.
    // The file starts with comments and DROP DATABASE.

    connection.query(sqlFile, (err, results) => {
        if (err) {
            console.error('Error executing SQL script:', err);
            connection.end();
            process.exit(1);
        }
        console.log('Database setup completed successfully.');
        connection.end();
    });
});
