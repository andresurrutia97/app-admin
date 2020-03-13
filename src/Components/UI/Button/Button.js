import React from "react";
import Button from "@material-ui/core/Button";
import styles from "./Button.module.scss";

export default function IconLabelButtons(props) {
  return (
    <div>
      <Button
        disabled={props.disabled}
        className={styles[props.type]}
        onClick={props.clicked}
      >
        {props.children}
      </Button>
    </div>
  );
}
