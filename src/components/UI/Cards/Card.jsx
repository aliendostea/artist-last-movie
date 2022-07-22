import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import setOtherImageIfIsNull from "../../../utilities/utilitiesFuntions";
import Button from "../Btn/Button";
import IconHeart from "../IconHeart/IconHeart";

import style from "./Card.module.scss";

const Card = ({
  title,
  popularity,
  onClick = undefined,
  onClickButton = undefined,
  liked,
  link = "",
  imgRoute,
}) => {
  const [isLikeVisible, setIsLikeVisible] = useState(false);

  useEffect(() => {
    if (!liked) return;

    setIsLikeVisible(true);

    const identifier = setTimeout(() => {
      setIsLikeVisible(false);
    }, 1400);

    return () => {
      clearInterval(identifier);
    };
  }, [liked]);

  const srcCardImg =
    imgRoute !== null
      ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${imgRoute}`
      : `./img/${setOtherImageIfIsNull(imgRoute)}`;

  return (
    <div className={style.card}>
      <Link to={link} onClick={onClick} className={style["card-link"]}>
        <figure className={style["card-img"]}>
          <img
            className={
              imgRoute !== null
                ? style["card-imgItem"]
                : style["card-imgItem-null"]
            }
            src={srcCardImg}
            alt={title}
            loading="lazy"
          />
        </figure>
      </Link>
      {liked && <IconHeart isActive={isLikeVisible} />}
      <div className={style["card-title-box"]}>
        <span className={style["card-title"]}>{title}</span>

        {popularity && (
          <Button iconType="heart" onClick={onClickButton}>
            <span
              className={
                liked
                  ? `${style["material-heart"]} ${style["material-heart-liked"]} material-symbols-rounded`
                  : `${style["material-heart"]} material-symbols-rounded`
              }
            >
              favorite
            </span>
            <span className={style["btn-heart-title2"]}>
              Likes: {popularity}
            </span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Card;
