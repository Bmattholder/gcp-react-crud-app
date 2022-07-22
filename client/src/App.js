import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [movieReviewList, setMovieList] = useState([]);

  const [newReview, setNewReview] = useState('');

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setMovieList(response.data);
    });
  }, []);

  const submitReview = () => {
    Axios.post('http://localhost:3001/api/insert', {
      movieName: movieName,
      movieReview: review,
    });

    setMovieList([
      ...movieReviewList,
      { movieName: movieName, movieReview: review },
    ]);
  };

  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);

    Axios.get('http://localhost:3001/api/get').then((response) => {
      setMovieList(response.data);
    });
  };

  const updateReview = (movie) => {
    Axios.put('http://localhost:3001/api/update', {
      movieName: movie,
      movieReview: newReview,
    });
    setNewReview('');
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setMovieList(response.data);
    });
  };

  return (
    <div className='App'>
      <h1>CRUD APPLICATION</h1>

      <div className='form'>
        <label>Movie Name:</label>
        <input
          type='text'
          name='movieName'
          placeholder='Movie Name'
          onChange={(e) => {
            setMovieName(e.target.value);
          }}
        />
        <label>Review:</label>
        <input
          type='text'
          name='review'
          placeholder='Review'
          onChange={(e) => {
            setReview(e.target.value);
          }}
        />
        <button onClick={submitReview}>Submit</button>
        <br />
        ..............................
        {movieReviewList.map((val) => {
          return (
            <div className='card'>
              <h2>{val.movieName}</h2>
              <p>{val.movieReview}</p>

              <button
                onClick={() => {
                  deleteReview(val.movieName);
                }}
              >
                Delete
              </button>
              <input
                type='text'
                id='updateInput'
                placeholder='Update'
                onChange={(e) => {
                  setNewReview(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  updateReview(val.movieName);
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
