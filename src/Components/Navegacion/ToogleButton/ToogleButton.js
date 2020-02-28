import React from "react";
import styles from "./ToogleButton.module.scss";

const ToogleButton = props => {
  return (
    <div onClick={props.clicked} className={styles.ToogleButton}>
      <i className="material-icons">menu</i>
    </div>
  );
};

export default ToogleButton;
