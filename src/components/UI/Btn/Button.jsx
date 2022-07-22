import React from "react";

import style from "./Button.module.scss";

const Button = ({
  label,
  children = false,
  icon = false,
  iconType,
  theme = false,
  size = false,
  fullwidth = false,
  disabled = false,
  onClick,
}) => {
  const classes = [
    style.btn,
    size && style[`btn_${size}`],
    theme && style[`btn_${theme}`],
    iconType && style[`btn-${iconType}`],
    fullwidth && style.btn_fluid,
    disabled && style.btn_disabled,
  ].join(" ");

  return (
    <button className={classes} onClick={onClick}>
      {label && label}
      {children && children}
      {icon && <span className="material-symbols-rounded">{iconType} </span>}
    </button>
  );
};

export default Button;
