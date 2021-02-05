import React, { useState } from "react";
import "./App.css";
import MovieList from "./Components/MovieList";
import { MovieProvider } from "./context/MovieContext";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Nominate from "./Components/Nominate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [movie, setMovie] = useState(null);

  return (
    <div className="app">
      <ToastContainer />
      <h1>seach for and nominate your favorite movie</h1>
      <Router>
        <MovieProvider>
          <Route
            path="/"
            exact
            render={() => <MovieList movie={movie} setMovie={setMovie} />}
          />
          <Route path="/nominate" exact component={Nominate}></Route>
        </MovieProvider>
      </Router>
    </div>
  );
}
