import { NavLink } from "react-router-dom";

import clsx from "clsx";

import css from "./Navigation.module.css";

const Navigation = () => {
  const createClassString = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <nav>
      <NavLink to="/" className={createClassString}>
        Home
      </NavLink>
      <NavLink to="/movies" className={createClassString}>
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
