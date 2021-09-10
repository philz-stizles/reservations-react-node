import React from "react";
import Image from "next/image";
import classes from "./FlatCard.module.css";
import Link from "next/link";

const FlatCard = ({ image, title, content, category, href }) => {
  return (
    <div className={classes["flat-card"]}>
      <div className={classes["flat-card__image"]}>
        <Image src={image} alt={title} width={400} height={400} />
      </div>

      <div className={classes["flat-card__info"]}>
        {category && (
          <h5 className={classes["flat-card__sub-title"]}>{category}</h5>
        )}
        <h3 className={classes["flat-card__title"]}>
          <Link href={href}>{title}</Link>
        </h3>
        <p className={classes["flat-card__content"]}>{content}</p>
      </div>
    </div>
  );
};

export default FlatCard;
