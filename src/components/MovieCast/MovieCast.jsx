import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

const MovieCast = () => {
  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState([]);

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
        const response = await axios.get(`/movie/${movieId}/credits`, options);

        setMovieCast(response.data.cast);
      } catch (error) {
        console.log(error);
      }
    };
    requestMovieByID();
  }, [movieId]);

  return (
    <ul>
      {movieCast.map((person) => {
        return (
          <li key={person.id}>
            <img
              src={
                person.profile_path
                  ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                  : defaultImg
              }
              width={200}
              alt={person.name}
            />
            <p>Name: {person.name}</p>
            <p>Character: {person.character}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieCast;
