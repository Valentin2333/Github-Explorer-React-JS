import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import Sidebar from "./Sidebar";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <div>
          <Sidebar />
        </div>
        <ul className={classes.links}>
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
              to="/userprofile"
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

export default MainNavigation;
