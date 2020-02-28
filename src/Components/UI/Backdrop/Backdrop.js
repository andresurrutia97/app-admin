import React from "react";
import styles from "./Backdrop.module.scss";

const backdrop = props => {
  let attachedClasses = [styles.Backdrop, styles.Close];
  if (props.show) {
    attachedClasses = [styles.Backdrop, styles.Open];
  }

  return (
    <div className={attachedClasses.join(" ")} onClick={props.close}></div>
  );
};

export default backdrop;
