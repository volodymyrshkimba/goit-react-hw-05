import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieInfo, setMovieInfo] = useState({});
  const [movieGenre, setMovieGenres] = useState([]);
  const location = useLocation();
  const backLink = useRef(location.state ?? "/movies");

  useEffect(() => {
    const requestMovieByID = async () => {
      try {
        const options = {
          baseURL: "https://api.themoviedb.org/3",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTk1MjZiZTM5MWZhYTU1ZWRiN2Y0ODlmN2UwNjA0YSIsIm5iZiI6MTcyOTExNzYzNS4wNDYzODcsInN1YiI6IjY3MGZlM2Q2NmY3NzA3YWY0MGZhM2E5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g7JV943APwbCCMw-Ds9VKU1mueF2qh7-ChFKZfHBTlo",
          },
        };
        const response = await axios.get(`/movie/${movieId}`, options);

        setMovieInfo(response.data);
        setMovieGenres(response.data.genres);
      } catch (error) {
        console.log(error);
      }
    };
    requestMovieByID();
  }, [movieId]);
  return (
    <div>
      <Link to={backLink.current}>Go back</Link>
      <h2>{movieInfo["original_title"]}</h2>
      <p>Overview: {movieInfo.overview}</p>
      <ul>
        Genres:
        {movieGenre.map((genre) => {
          return <li key={genre.id}> {genre.name}</li>;
        })}
      </ul>
      <img
        src={
          movieInfo.poster_path
            ? `https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`
            : defaultImg
        }
        alt={movieInfo["original_title"]}
        width={300}
      />
      <div>
        <Link to="cast">Cast</Link>
        <Link to="reviews">Reviews</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
