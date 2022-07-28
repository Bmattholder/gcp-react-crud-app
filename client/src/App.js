import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';

function App() {
  // example: const [data, setData] = useState([]); data is an array of objects
  const [fullname, setFullname] = useState(''); // setFullname is the state
  const [amount, setAmount] = useState('');
  const [amountList, setAmountList] = useState([]);
  const [newAmount, setNewAmount] = useState('');
  const [id, setId] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [email, setEmail] = useState('');
  const [paid, setPaid] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [pastDue, setPastDue] = useState('');

  // useEffect is a hook that runs after the component is rendered
  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setAmountList(response.data);
    });
  }, []);

  const submitAmount = () => {
    Axios.post('http://localhost:3001/api/insert', {
      fullname: fullname,
      amount: amount,
      ID: id,
      street_address: streetAddress,
      city: city,
      state: state,
      zip: zip,
      email: email,
      paid: paid,
      due_date: dueDate,
      past_due: pastDue,
    });

    setAmountList([
      ...amountList,
      {
        fullname: fullname,
        amount: amount,
        ID: id,
        street_address: streetAddress,
        city: city,
        state: state,
        zip: zip,
        email: email,
        paid: paid,
        due_date: dueDate,
        past_due: pastDue,
      },
    ]);
  };

  const updateAmount = (fullname) => {
    Axios.put('http://localhost:3001/api/update', {
      fullname: fullname,
      amount: newAmount,
    });
    setNewAmount('');
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setAmountList(response.data);
    });
  };

  const deleteClient = (client_id) => {
    Axios.delete(`http://localhost:3001/api/delete/${client_id}`).then(
      (response) => {
        Axios.get('http://localhost:3001/api/get').then((response) => {
          setAmountList(response.data);
        });
      }
    );
  };

  return (
    <div className='App'>
      <h1>Cinch Billing</h1>

      <div className='form'>
        <div className='form-style'>
          <input
            type='number'
            min='1'
            name='id'
            required
            placeholder='ID'
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
          <input
            type='text'
            name='fullname'
            required
            placeholder='Full Name'
            onChange={(e) => {
              setFullname(e.target.value);
            }}
          />
          <input
            type='number'
            min='1'
            name='amount'
            required
            placeholder='Billable Amount'
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
          <input
            type='text'
            name='street address'
            required
            placeholder='Street Address'
            onChange={(e) => {
              setStreetAddress(e.target.value);
            }}
          />
          <input
            type='text'
            name='city'
            required
            placeholder='City'
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
          <input
            type='text'
            name='state'
            required
            placeholder='State'
            onChange={(e) => {
              setState(e.target.value);
            }}
          />
          <input
            type='number'
            min='11111'
            name='zip'
            required
            placeholder='Zip'
            onChange={(e) => {
              setZip(e.target.value);
            }}
          />
          <input
            type='email'
            name='email'
            required
            placeholder='Email'
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type='boolean'
            name='paid'
            required
            placeholder='Paid'
            onChange={(e) => {
              setPaid(e.target.value);
            }}
          />
          <input
            type='text'
            name='dueDate'
            required
            placeholder='Due Date'
            onChange={(e) => {
              setDueDate(e.target.value);
            }}
          />
          <input
            type='boolean'
            name='pastDue'
            required
            placeholder='Past Due'
            onChange={(e) => {
              setPastDue(e.target.value);
            }}
          />{' '}
          <br />
          <Button type='submit' onClick={submitAmount}>
            Submit
          </Button>
        </div>
        <br />
        ..............................
        {amountList
          .slice(0)
          .reverse()
          .map((val) => {
            return (
              <div className='Card'>
                <h2>ID: {val.ID}</h2>
                <p>Name: {val.fullname}</p>
                <p>Total Owed: ${val.amount}</p>
                <p>Street Address: {val.street_address}</p>
                <p>City: {val.city}</p>
                <p>State: {val.state}</p>
                <p>Zip: {val.zip}</p>
                <p>Email: {val.email}</p>
                <p>Paid? {val.paid}</p>
                <p>Due Date: {val.due_date}</p>
                <p>Past Due? {val.past_due}</p>

                <button
                  type='button'
                  class='btn btn-danger'
                  onClick={() => {
                    deleteClient(val.ID);
                  }}
                >
                  Delete
                </button>
                <input
                  type='number'
                  id='updateInput'
                  placeholder='New Amt'
                  onChange={(e) => {
                    setNewAmount(e.target.value);
                  }}
                />
                <button
                  type='button'
                  class='btn btn-success'
                  onClick={() => {
                    updateAmount(val.fullname);
                  }}
                >
                  Update
                </button>
                <br />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
