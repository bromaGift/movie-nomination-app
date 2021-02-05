import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NominatedMovies } from "../context/MovieContext";

function Nominate() {
  const [nominate, setNominate] = NominatedMovies();
  const [keys, setKeys] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const v = [];

    Object.keys(localStorage).forEach((key, index) => {
      v.push(key);
      if (localStorage.length === v.length) {
        setKeys(v);
      }
    });
  }, []);

  useEffect(() => {
    const q = [];

    keys &&
      keys.forEach((id) => {
        fetch(`http://www.omdbapi.com/?i=${id}&apikey=7d07e2f1`).then((res) => {
          if (res.status !== 200) {
            console.log("error");
            return;
          }
          res.json().then((data) => {
            q.push(data);
            if (keys.length === q.length) {
              setMovies(q);
            }
          });
        });
      });
  }, [keys]);

  return (
    <div className="MovieList">
      <Link to="/">
        <button className="delete-btn">back to home</button>
      </Link>
      {movies &&
        movies.map((movie, index) => (
          <div className="movieList" key={index}>
            <img src={movie.Poster} alt={movie.Poster} />
            <h3 className="MovieList__title">{movie.Title}</h3>
            <p className="moviesList__year">{movie.Year}</p>

            <button
              className="delete-btn"
              onClick={() => {
                localStorage.removeItem(movie.imdbID);
                setMovies([
                  ...movies.splice(0, index),
                  ...movies.splice(index + 1),
                ]);
              }}
            >
              Delete
            </button>
          </div>
        ))}
    </div>
  );
}

export default Nominate;
