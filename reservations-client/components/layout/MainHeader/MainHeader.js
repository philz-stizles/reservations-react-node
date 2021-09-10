import React from "react";
import Link from "next/link";
import classes from "./MainHeader.module.css";

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">Events</Link>
      </div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <Link href="/events">All Events</Link>
          </li>
          <li>
            <Link href="/auth">Login</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li className={classes.logout}>Logout</li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
