import React from "react";
import Button from "../../UI/Btn/Button";

import style from "./NavHeader.module.scss";

const NavHeader = () => {
  return (
    <nav className={style.nav}>
      <div>Este es el header</div>
      <Button label="Login" />
    </nav>
  );
};

export default NavHeader;
