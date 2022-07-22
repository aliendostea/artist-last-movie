import React from "react";
import { useSelector } from "react-redux";
import SearchBar from "../Inputs/SearchBar";

const Form = ({ onSubmit, onChange }) => {
  const querySearched = useSelector((state) => state.search);

  return (
    <form onSubmit={onSubmit}>
      <SearchBar
        label="Search your artist"
        onChange={onChange}
        value={querySearched}
      />
    </form>
  );
};

export default Form;
