import axios from "axios";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState([]);

  useEffect(() => {
    const requestMovieReviews = async () => {
      try {
        const options = {
          baseURL: "https://api.themoviedb.org/3",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTk1MjZiZTM5MWZhYTU1ZWRiN2Y0ODlmN2UwNjA0YSIsIm5iZiI6MTcyOTExNzYzNS4wNDYzODcsInN1YiI6IjY3MGZlM2Q2NmY3NzA3YWY0MGZhM2E5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g7JV943APwbCCMw-Ds9VKU1mueF2qh7-ChFKZfHBTlo",
          },
        };
        const response = await axios.get(`/movie/${movieId}/reviews`, options);

        setMovieReviews(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    requestMovieReviews();
  }, [movieId]);

  return (
    <div>
      {movieReviews.length !== 0 ? (
        <ul>
          {movieReviews.map((review) => {
            return (
              <li key={review.id}>
                <h3>Author: {review.author}</h3>
                <p>
                  <b>Comment:</b> {review.content}
                </p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>We dont have any reviews</p>
      )}
    </div>
  );
};

export default MovieReviews;
