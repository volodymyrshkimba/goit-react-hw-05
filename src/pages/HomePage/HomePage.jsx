import axios from "axios";
import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const requestFilms = async () => {
      try {
        const options = {
          baseURL: "https://api.themoviedb.org/3",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTk1MjZiZTM5MWZhYTU1ZWRiN2Y0ODlmN2UwNjA0YSIsIm5iZiI6MTcyOTExNzYzNS4wNDYzODcsInN1YiI6IjY3MGZlM2Q2NmY3NzA3YWY0MGZhM2E5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g7JV943APwbCCMw-Ds9VKU1mueF2qh7-ChFKZfHBTlo",
          },
        };
        const response = await axios.get("/trending/movie/day", options);
        setMovies(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    requestFilms();
  }, []);

  return (
    <div>
      <h1>Trendind today</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
