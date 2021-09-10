import React from "react";
import classes from "./NotFoundV1.module.css";

const NotFoundV1 = () => {
  return (
    <div className={classes.notFoundPage}>
      <div className={classes.info}>
        <h1 className={classes["info__header"]}>404</h1>
        <p className={classes["info__content"]}>
          This page does not exist.
          <br />
          But there are other pages you can explore
        </p>
        <button className={classes["info__button"]}>Go to home page</button>
      </div>
    </div>
  );
};

export default NotFoundV1;
