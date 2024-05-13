
import React from "react";

const menuButton = props => (
  <li
    onClick={props.onClick}
    className={"menu-item" + (props.active ? " active" : "")}
  >
    {props.title}
  </li>
);

export default menuButton;
