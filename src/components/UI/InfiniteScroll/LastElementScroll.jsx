import Loader from "../Loader/Loader";
import classes from "./LastElementScroll.module.scss";

const LastElementScroll = ({ lastElementRef, isItemsEmpty }) => {
  return (
    <div ref={lastElementRef} className={classes["last-element"]}>
      {!isItemsEmpty && (
        <Loader titleLoader="We're uploading more pictures for you, wait a second...." />
      )}
    </div>
  );
};

export default LastElementScroll;
