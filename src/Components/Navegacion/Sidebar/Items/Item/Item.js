import React from "react";
import styles from "./Item.module.scss";
import { NavLink } from "react-router-dom";

const Item = props => {
  return (
    <li className={styles.Item}>
      <NavLink activeClassName={styles.active} to={props.link} exact>
        <div className={styles.hoverFlag} />
        <div className={styles.icon}>
          <i className="material-icons-outlined" style={{fontSize: "18px"}}>
            {props.icon}
          </i>
        </div>
        {props.children}
      </NavLink>
    </li>
  );
};

export default Item;
