import React, { useState, useEffect, useContext, createContext } from "react";

const MovieContext = createContext();

export const NominatedMovies = () => {
  return useContext(MovieContext);
};

export const MovieProvider = ({ children }) => {
  const [nominate, setNominate] = useState([]);

  useEffect(() => {
    const v = [];

    Object.keys(localStorage).forEach((key, index) => {
      v.push(key);
      if (localStorage.length === v.length) {
        setNominate(v);
      }
    });
  }, []);

  return (
    <MovieContext.Provider value={[nominate, setNominate]}>
      {children}
    </MovieContext.Provider>
  );
};
