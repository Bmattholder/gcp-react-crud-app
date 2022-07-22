const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Password1!',
  database: 'cinch-billing',
});

app.use(bodyParser.urlencoded({ extended: true }));

// Routes

app.get('/api/get', (req, res) => {
  const sqlSelect = 'SELECT * FROM client_data';
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post('/api/insert', (req, res) => {
  const fullname = req.body.fullname;
  const amount = req.body.amount;

  const sqlInsert =
    'INSERT INTO client_data (fullname, amount) VALUES (?, ?)';
  db.query(sqlInsert, [fullname, amount], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
});

app.delete('/api/delete/:fullname', (req, res) => {
  const fullname = req.params.fullname;
  const sqlDelete = 'DELETE FROM client_data WHERE fullname = ?';

  db.query(sqlDelete, fullname, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

app.put('/api/update', (req, res) => {
  const fullname = req.body.fullname;
  const amount = req.body.amount;
  const sqlUpdate =
    'UPDATE client_data SET amount = ? WHERE fullname = ?';

  db.query(sqlUpdate, [amount, fullname], (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

// Start server
app.listen(3001, () => {
  console.log('Server running on port 3001');
});
