// Import express
const express = require('express'); 

// for parsing the body of the request
const bodyParser = require('body-parser'); 

/* Cross-Origin Resource Sharing - middleware for Express. 
Allows you to share data with a different origin. */
const cors = require('cors'); 

// create our app
const app = express(); 
// import the mysql module
const mysql = require('mysql'); 

// use the cors middleware
app.use(cors()); 
// use the body parser middleware
app.use(express.json()); 


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Password1!',
  database: 'cinch-billing',
});

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 


// Routes

// get all customers
app.get('/api/get', (req, res) => { 
  const sqlSelect = 'SELECT * FROM client_data';
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

// Post to the db.  req.body is the data sent in the request
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
 
// :fullname is a placeholder for the id
app.delete('/api/delete/:fullname', (req, res) => { 
  const fullname = req.params.fullname;
  const sqlDelete = 'DELETE FROM client_data WHERE fullname = ?';

  db.query(sqlDelete, fullname, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

// update the amount of a client
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
