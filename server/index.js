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
  const id = req.body.ID;
  const streetAddress = req.body.street_address;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;
  const email = req.body.email;
  const paid = req.body.paid;
  const dueDate = req.body.due_date;
  const pastDue = req.body.past_due;
  const sqlInsert = `INSERT INTO client_data (fullname, amount, id, street_address, city, state, zip, email, paid, due_date, past_due) 
    VALUES ('${fullname}', '${amount}', '${id}', '${streetAddress}', '${city}', '${state}', '${zip}', '${email}', '${paid}', '${dueDate}', '${pastDue}')`;
  db.query(
    sqlInsert,
    [
      fullname,
      amount,
      id,
      streetAddress,
      city,
      state,
      zip,
      email,
      paid,
      dueDate,
      pastDue,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );
});
// update the amount of a client
app.put('/api/update', (req, res) => {
  const fullname = req.body.fullname;
  const amount = req.body.amount;

  db.query(
    `UPDATE client_data SET amount = ? WHERE fullname = ?`,
    [amount, fullname],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.delete(`/api/delete/:client_id`, (req, res) => {
  const id = req.params.client_id;
  db.query(`DELETE FROM client_data WHERE ID = ?`, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
// Start server
app.listen(3001, () => {
  console.log('Server running on port 3001');
});
