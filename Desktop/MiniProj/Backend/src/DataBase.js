const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config(); 

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "issat",
});

db.connect(err => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1); 
  } else {
    console.log('✅ Connected to MySQL Database');
  }
});

module.exports = db;
