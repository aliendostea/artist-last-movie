import classes from "./Loader.module.scss";

const Loader = ({ titleLoader }) => {
  return (
    <div className={classes["spinner-box"]}>
      <div className={classes["sk-chase"]}>
        <div className={classes["sk-chase-dot"]}></div>
        <div className={classes["sk-chase-dot"]}></div>
        <div className={classes["sk-chase-dot"]}></div>
        <div className={classes["sk-chase-dot"]}></div>
        <div className={classes["sk-chase-dot"]}></div>
        <div className={classes["sk-chase-dot"]}></div>
      </div>
      {titleLoader && (
        <span className={classes["spinner-box-p"]}>{titleLoader}</span>
      )}
    </div>
  );
};

export default Loader;
