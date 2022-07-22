import style from "./IconHeart.module.scss";

const IconHeart = ({ isActive }) => {
  return (
    <span
      className={
        isActive
          ? `${style["like"]} ${style["like--active"]} material-symbols-rounded`
          : `${style["like"]} material-symbols-rounded`
      }
    >
      favorite
    </span>
  );
};

export default IconHeart;
