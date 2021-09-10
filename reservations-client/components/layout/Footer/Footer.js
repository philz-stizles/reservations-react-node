import React from "react";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className="container">
        <div className={classes["footer__content"]}>
          <div>Logo</div>
          <div className={classes.content}>
            <h3 className={classes["content__header"]}>Company</h3>
            <ul className={classes["content__list"]}>
              <li className={classes["content__item"]}>About</li>
              <li className={classes["content__item"]}>Blog</li>
              <li className={classes["content__item"]}>Portfolio</li>
              <li className={classes["content__item"]}>Contact</li>
            </ul>
          </div>

          <div className={classes.content}>
            <h3 className={classes["content__header"]}>Community</h3>
            <ul className={classes["content__list"]}>
              <li className={classes["content__item"]}>About</li>
              <li className={classes["content__item"]}>Blog</li>
              <li className={classes["content__item"]}>Portfolio</li>
              <li className={classes["content__item"]}>Contact</li>
            </ul>
          </div>

          <div className={classes.content}>
            <h3 className={classes["content__header"]}>Services</h3>
            <ul className={classes["content__list"]}>
              <li className={classes["content__item"]}>About</li>
              <li className={classes["content__item"]}>Blog</li>
              <li className={classes["content__item"]}>Portfolio</li>
              <li className={classes["content__item"]}>Contact</li>
            </ul>
          </div>

          <div className={classes.content}>
            <h3 className={classes["content__header"]}>Learning</h3>
            <ul className={classes["content__list"]}>
              <li className={classes["content__item"]}>About</li>
              <li className={classes["content__item"]}>Blog</li>
              <li className={classes["content__item"]}>Portfolio</li>
              <li className={classes["content__item"]}>Contact</li>
            </ul>
          </div>

          <div className={classes.content}>
            <i className="lab la-facebook-square"></i>
            <i className="lab la-instagram"></i>
            <i className="lab la-twitter-square"></i>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
