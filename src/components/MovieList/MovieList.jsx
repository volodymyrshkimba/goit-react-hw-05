import { Link, useLocation } from "react-router-dom";
import { MdArrowRightAlt } from "react-icons/md";

import css from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul>
      {movies.map((movie) => {
        return (
          <li key={movie.id}>
            <Link
              className={css.link}
              to={`/movies/${movie.id}`}
              state={location}
            >
              <MdArrowRightAlt size={20} />

              {movie.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieList;
