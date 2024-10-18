import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import MoviesSearchForm from "../../components/MoviesSearchForm/MoviesSearchForm";
import MovieList from "../../components/MovieList/MovieList";

import { requestMoviesByQuery } from "../../services/TMDB-api";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [seatchParams, setSearchParams] = useSearchParams();
  const query = seatchParams.get("query") ?? "";

  const onSearch = (keyWord) => {
    setSearchParams({ query: keyWord });
  };

  useEffect(() => {
    if (query === "") {
      return;
    }
    const request = async () => {
      try {
        setLoading(true);
        const response = await requestMoviesByQuery(query);
        setMovies(response.data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    request();
  }, [query]);

  return (
    <div>
      <MoviesSearchForm onSearch={onSearch} />
      {loading && <div>LOADING...</div>}
      {movies.length !== 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
