import React from "react";
import styles from "./Titulo.module.scss";

const Titulo = props => {
  return <div className={styles.Title}>{props.children}</div>;
};

export default Titulo;
