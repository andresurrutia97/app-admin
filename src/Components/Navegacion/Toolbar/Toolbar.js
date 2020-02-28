import React from "react";
import styles from "./Toolbar.module.scss";
import ToogleButton from "../ToogleButton/ToogleButton";

const Toolbar = (props) => {
  return (
    <div className={styles.Toolbar}>
      <div className={styles.icono}>
        <ToogleButton clicked={props.open} />
      </div>
      <div className={styles.Titulo}>
        <h4>Titulo</h4>
      </div>
    </div>
  );
};

export default Toolbar;
