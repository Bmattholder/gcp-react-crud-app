import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [fullname, setFullname] = useState('');
  const [amount, setAmount] = useState('');
  const [amountList, setAmountList] = useState([]);

  const [newAmount, setNewAmount] = useState('');

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

    setAmountList([
      ...amountList,
      { fullname: fullname, amount: amount },
    ]);
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
