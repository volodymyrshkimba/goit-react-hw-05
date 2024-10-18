import { Suspense, useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";

import { requestMovieById } from "../../services/TMDB-api";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieInfo, setMovieInfo] = useState({});
  const [movieGenre, setMovieGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const backLink = useRef(location.state ?? "/movies");

  useEffect(() => {
    const request = async () => {
      try {
        setLoading(true);
        const response = await requestMovieById(movieId);

        setMovieInfo(response.data);
        setMovieGenres(response.data.genres);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    request();
  }, [movieId]);

  return (
    <div>
      <Link to={backLink.current}>Go back</Link>

      {loading && <div>LOADING...</div>}
      <h2>{movieInfo.original_title}</h2>
      {movieInfo.overview && <p>Overview: {movieInfo.overview}</p>}
      {movieGenre.length !== 0 && (
        <ul>
          Genres:
          {movieGenre.map((genre) => {
            return <li key={genre.id}> {genre.name}</li>;
          })}
        </ul>
      )}
      {movieInfo.vote_count !== 0 && (
        <ul>
          <li>Rating: {Math.round(movieInfo.vote_average * 10) / 10} / 10</li>
          <li>Votes: {movieInfo.vote_count}</li>
        </ul>
      )}
      <img
        src={
          movieInfo.poster_path
            ? `https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`
            : defaultImg
        }
        alt={movieInfo["original_title"]}
        width={300}
      />
      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
