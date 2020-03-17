import React from "react";
import Button from "@material-ui/core/Button";
import styles from "./Button.module.scss";

export default function IconLabelButtons(props) {
  let classes = [styles[props.type]];
  if (props.disabled) {
    classes = [styles[props.type], styles.Disabled];
  }
  return (
    <div>
      <Button
        disabled={props.disabled}
        className={classes.join(" ")}
        onClick={props.clicked}
      >
        {props.children}
      </Button>
    </div>
  );
}
