import { NavLink } from "react-router-dom";

import clsx from "clsx";

import css from "./Navigation.module.css";

const Navigation = () => {
  const createClassString = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <nav className={css.nav}>
      <ul className={css.list}>
        <li>
          <NavLink to="/" className={createClassString}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" className={createClassString}>
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
