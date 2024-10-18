import { useEffect, useState } from "react";

import MovieList from "../../components/MovieList/MovieList";

import { requestMovies } from "../../services/TMDB-api";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const request = async () => {
      try {
        setLoading(true);
        const response = await requestMovies();
        setMovies(response.data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    request();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      {loading && <div>LOADING...</div>}
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
