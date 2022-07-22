import React from "react";
import Button from "../Btn/Button";

import style from "./SearchBar.module.scss";

const SearchBar = ({ label, onChange }) => {
  return (
    <div className={style["search-box"]}>
      <input
        id="new"
        type="text"
        onChange={onChange}
        className={style.search}
        placeholder={label}
      />
      <Button icon={true} iconType="search" />
    </div>
  );
};

export default SearchBar;
