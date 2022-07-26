import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

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
    });

    setAmountList([...amountList, { fullname: fullname, amount: amount }]);
  };

  const deleteAmount = (fullname) => {
    Axios.delete(`http://localhost:3001/api/delete/${fullname}`);

    Axios.get('http://localhost:3001/api/get').then((response) => {
      setAmountList(response.data);
    });
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

  return (
    <div className='App'>
      <h1>CRUD APPLICATION</h1>

      <div className='form'>
        <label>Full Name:</label>
        <input
          type='text'
          name='fullname'
          placeholder='Full Name'
          onChange={(e) => {
            setFullname(e.target.value);
          }}
        />
        <label>Amount:</label>
        <input
          type='text'
          name='amount'
          placeholder='Billable Amount'
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
        <button onClick={submitAmount}>Submit</button>
        <br />
        ..............................
        {amountList.map((val) => {
          return (
            <div className='card'>
              <h2>{val.fullname}</h2>
              <p>${val.amount}</p>

              <button
                onClick={() => {
                  deleteAmount(val.fullname);
                }}
              >
                Delete
              </button>
              <input
                type='text'
                id='updateInput'
                placeholder='Update Amount'
                onChange={(e) => {
                  setNewAmount(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  updateAmount(val.fullname);
                }}
              >
                Update
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
