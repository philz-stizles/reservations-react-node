import React from "react";
import classes from "./BlogCategories.module.css";

const BlogCategories = ({ categories }) => {
  return (
    <div className={classes.categoryList}>
      <h4 className={classes.categoryName}>All Topics</h4>
      {categories.map(({ id, name }) => (
        <h4 key={id} className={classes.categoryName}>
          {name}
        </h4>
      ))}
    </div>
  );
};

export default BlogCategories;
