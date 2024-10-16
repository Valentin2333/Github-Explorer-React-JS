import classes from "./UserCard.module.css";
import { Link } from "react-router-dom";

function UserCard({user}) {
  return (
    <Link to={`users/${user.login}`} className={classes.userCard}>
      <img
        src={user.avatar_url}
        alt={user.login}
        className={classes.avatar}
      />
      <div className={classes.userInfo}>
        <p className={classes.username}>
          {user.login} ({user.id})
        </p>
      </div>
    </Link>
  );
}

export default UserCard;
