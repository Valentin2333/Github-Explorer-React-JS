import { useParams, Link } from "react-router-dom";
import classes from "./UserDetails.module.css";

export default function UserDetails() {
  const params = useParams();

  return (
    <div className={classes.container}>
      <h1 className={classes.user}>Page of user {params.username}</h1>
      <Link to="/" className={classes.backBtn}>
        Back
      </Link>
    </div>
  );
}

