const mysql = require('mysql');

const datab = mysql.createConnection({
  host: '127.0.0.1',
  port: 3004,
  user: 'admin@012',
  password: 'admin@012',
  database: 'myappdb',
});

datab.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});


module.exports = datab;
