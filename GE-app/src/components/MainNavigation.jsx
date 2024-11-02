import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import Sidebar from "./Sidebar";
import ErrorMessage from "./ErrorMessage";
import { ErrorContext } from "./ErrorContext";
import { useContext } from "react";

export default function MainNavigation() {
  const { error, setError } = useContext(ErrorContext);
  const { isLoadMoreVisible, setIsLoadMoreVisible } = useContext(ErrorContext);

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <div
          className={`${classes["adjust-buger-logo"]} ${classes["sidebar-logo"]}`}
        >
          <div className={classes["hide-burger"]}>
            <Sidebar />
          </div>
          <img
            className={`${classes["adjust-logo"]} ${classes.logo}`}
            src="/logo.png"
            alt="Site logo"
          />
        </div>

        <ErrorMessage
          error={error}
          resetError={() => setError(null)}
          setIsLoadMoreVisible={setIsLoadMoreVisible}
        />

        <ul className={`${classes.links} ${classes["hide-links"]}`}>
          <li className={classes.links}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Home
            </NavLink>
          </li>
          <li className={classes.links}>
            <NavLink
              to="/users/Valentin"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              User Profile
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
