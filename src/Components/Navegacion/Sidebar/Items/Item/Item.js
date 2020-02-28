import React from "react";
import styles from "./Item.module.scss";
import { NavLink } from "react-router-dom";

const Item = props => {
  return (
    <li onClick={props.close} className={styles.Item}>
      <NavLink activeClassName={styles.active} to={props.link} exact>
        <div className={styles.hoverFlag} />
        <div className={styles.icon}>
          <i className="material-icons-outlined" style={{ fontSize: "18px" }}>
            {props.icon}
          </i>
        </div>
        <div>{props.children}</div>
      </NavLink>
    </li>
  );
};

export default Item;
