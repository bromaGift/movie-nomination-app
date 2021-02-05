import React, { useState } from "react";

function Search({ setMovie }) {
  const [title, setTitle] = useState("");

  const handleSearch = () => {
    const apiKey = `http://www.omdbapi.com/?s=${title}&apikey=7d07e2f1`;

    fetch(apiKey).then((res) => {
      if (res.status !== 200) {
        return;
      }
      res.json().then((data) => {
        setMovie(data);
      });
    });
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="search movies here"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <button className="search-btn" onClick={handleSearch}>
        search
      </button>
    </div>
  );
}

export default Search;
