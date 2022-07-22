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
  database: 'CRUDDataBase',
});

app.use(bodyParser.urlencoded({ extended: true }));

// Routes

app.get('/api/get', (req, res) => {
  const sqlSelect = 'SELECT * FROM movie_reviews';
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post('/api/insert', (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;

  const sqlInsert =
    'INSERT INTO movie_reviews (movieName, movieReview) VALUES (?, ?)';
  db.query(sqlInsert, [movieName, movieReview], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
});

app.delete('/api/delete/:movieName', (req, res) => {
  const name = req.params.movieName;
  const sqlDelete = 'DELETE FROM movie_reviews WHERE movieName = ?';

  db.query(sqlDelete, name, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

app.put('/api/update', (req, res) => {
  const name = req.body.movieName;
  const review = req.body.movieReview;
  const sqlUpdate =
    'UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?';

  db.query(sqlUpdate, [review, name], (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

// Start server
app.listen(3001, () => {
  console.log('Server running on port 3001');
});
