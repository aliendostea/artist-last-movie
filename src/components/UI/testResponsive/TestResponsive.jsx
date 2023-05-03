import { useState } from "react";
import classes from "./TestResponsive.module.scss";

const TestResponsive = () => {
  const [isActive, setIsActive] = useState(true);

  const handleClick = () => {
    setIsActive(false);
  };

  if (isActive) {
    return (
      <div className={classes["responsive"]}>
        Test__Responsive
        <button onClick={handleClick}>
          <span className="material-symbols-rounded">x</span>
        </button>
      </div>
    );
  }

  return null;
};

export default TestResponsive;
