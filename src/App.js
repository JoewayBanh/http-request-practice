import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMoviesHandler() {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("https://swapi.dev/api/films");

      if (!res.ok) {
        //.ok returns a bool if response was successful
        throw new Error("Something went wrong, buddy");
      }

      const data = await res.json(); //her parses JSON til js object

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }

  let content = <p>No movies found.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  } else if (error) {
    content = { error };
  }
  if (isLoading) {
    content = <p>Loading movies...</p>;
  }
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
