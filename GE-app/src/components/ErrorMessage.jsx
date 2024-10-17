import React, { useEffect, useState } from "react";
import classes from "./ErrorMessage.module.css";

function ErrorMessage({ error, resetError, setIsLoadMoreVisible }) {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (!error) return;

    let timeout;
    if (error === "Unable to fetch users.") {
      setTimer(60);
      setIsLoadMoreVisible(false);
      timeout = setTimeout(() => {
        resetError();
        setIsLoadMoreVisible(true);
      }, 60000);
    } else {
      setTimer(3.5);
      timeout = setTimeout(() => resetError(), 1200);
    }

    return () => clearTimeout(timeout);
  }, [error, resetError, setIsLoadMoreVisible]);

  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }

    return () => clearInterval(countdown);
  }, [timer]);

  if (!error) return null;

  return (
    <div className={classes.error}>
      {error}{" "}
      {error === "Unable to fetch users." && (
        <div>Try again in {timer} seconds...</div>
      )}
    </div>
  );
}

export default ErrorMessage;
