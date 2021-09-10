import React from "react";
import classes from "./SolidCard.module.css";

const SolidCard = ({ image, title, category }) => {
  return (
    <div className={classes["flat-card"]}>
      <div className={classes["flat-card__info"]}>
        {category && category.length > 0 && (
          <h5 className={classes["flat-card__sub-title"]}>
            {category[0].name}
          </h5>
        )}
        <h3 className={classes["flat-card__title"]}>{title}</h3>
      </div>

      <div className={classes["flat-card__image"]}>
        <Image src={image} title={title} />
      </div>
    </div>
  );
};

export default SolidCard;
