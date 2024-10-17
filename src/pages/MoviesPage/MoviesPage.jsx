import { useSearchParams } from "react-router-dom";
import MoviesSearchForm from "../../components/MoviesSearchForm/MoviesSearchForm";
import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [seatchParams, setSearchParams] = useSearchParams();
  const query = seatchParams.get("query") ?? "";

  const onSearch = (keyWord) => {
    setSearchParams({ query: keyWord });
  };

  useEffect(() => {
    if (query === "") {
      return;
    }
    const requestFilmsByQuery = async () => {
      try {
        const options = {
          baseURL: "https://api.themoviedb.org/3",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTk1MjZiZTM5MWZhYTU1ZWRiN2Y0ODlmN2UwNjA0YSIsIm5iZiI6MTcyOTExNzYzNS4wNDYzODcsInN1YiI6IjY3MGZlM2Q2NmY3NzA3YWY0MGZhM2E5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g7JV943APwbCCMw-Ds9VKU1mueF2qh7-ChFKZfHBTlo",
          },
        };
        const response = await axios.get(
          `search/movie?query=${query}`,
          options
        );

        setMovies(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    requestFilmsByQuery();
  }, [query]);

  return (
    <div>
      <MoviesSearchForm onSearch={onSearch} />
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
