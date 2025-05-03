const express = require('express');
const app = express();
const port = 3000;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const mysql = require('mysql');
const connection = mysql.createConnection(config);

const sql = `INSERT INTO people(name) values('Lucas')`;
connection.query(sql, function (error, results, fields) {
  if (error) throw error;
  console.log('Inserted: ', results);
});
connection.end();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Rodando na porta ${port}`);
});

// npm init
// npm install express
// cd usr/src/app
// node index.js