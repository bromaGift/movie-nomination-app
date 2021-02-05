import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import { NominatedMovies } from "../context/MovieContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

function MovieList({ movie, setMovie }) {
  const [nominate, setNominate] = NominatedMovies();

  return (
    <div className="movieList">
      <Search setMovie={setMovie} />
      <Link to="/nominate">
        <button className="view-btn">View Nominate List</button>
      </Link>

      {movie &&
        movie.Search.map((movie, index) => (
          <motion.div
            initial={{ marginLeft: 200 }}
            animate={{ marginLeft: 0 }}
            transition={{ delay: 6.5 }}
            className="movie-list"
            key={index}
          >
            <section className="movie__details">
              <img src={movie.Poster} alt={movie.Poster} />
              <h3 className="MovieList__title">{movie.Title}</h3>
              <p className="moviesList__year">{movie.Year}</p>
            </section>

            {!nominate.includes(movie.imdbID) ? (
              <button
                className="nominate-btn"
                onClick={() => {
                  if (nominate.length === 5) {
                    toast("you have nominated 5 movies");
                    return;
                  }
                  localStorage.setItem(movie.imdbID, movie.imdbID);
                  setNominate([...nominate, movie.imdbID]);
                }}
              >
                Nominate
              </button>
            ) : (
              <p>movie has been nominated</p>
            )}
          </motion.div>
        ))}
    </div>
  );
}

export default MovieList;
