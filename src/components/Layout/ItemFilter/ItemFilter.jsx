import { useDispatch, useSelector } from "react-redux";
import { filterButtonActions } from "../../../store";
import style from "./ItemFilter.module.scss";

const ItemFilter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filterButton);

  const handleClickMoreLikes = () => {
    dispatch(filterButtonActions.setMoreLikes());
  };

  const handleClickAlphabetically = () => {
    dispatch(filterButtonActions.setAlphabet());
  };

  const handleClickMales = () => {
    dispatch(filterButtonActions.setMales());
  };
  const handleClickFemales = () => {
    dispatch(filterButtonActions.setFemales());
  };

  const getButtonClassName = (clicked) => {
    return clicked
      ? `${style["btn"]} ${style["btn2"]} ${style["btn2-active"]}`
      : `${style["btn"]} ${style["btn2"]}`;
  };

  const ButtonElementX = ({ clicked }) => {
    return (
      clicked && (
        <span className={`${style["btn-m"]} material-symbols-rounded`}>
          close
        </span>
      )
    );
  };

  const arrayButtons = [
    {
      state: filter.moreLikes,
      onClick: handleClickMoreLikes,
      name: "moreLikes",
      title: "More likes",
    },
    {
      state: filter.alphabet,
      onClick: handleClickAlphabetically,
      name: "alphabetically",
      title: "A - Z",
    },
    {
      state: filter.males,
      onClick: handleClickMales,
      name: "males",
      title: "Males",
    },
    {
      state: filter.females,
      onClick: handleClickFemales,
      name: "females",
      title: "Females",
    },
  ];

  return (
    <div className={style["filter"]}>
      <span>Filter By:</span>
      {arrayButtons.map((btn) => (
        <button
          key={btn.name}
          className={getButtonClassName(btn.state)}
          onClick={btn.onClick}
        >
          <span> {btn.title} </span>
          <ButtonElementX clicked={btn.state} />
        </button>
      ))}
    </div>
  );
};

export default ItemFilter;
