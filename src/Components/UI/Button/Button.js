import React from "react";
import Button from "@material-ui/core/Button";
import styles from "./Button.module.scss";

export default function IconLabelButtons(props) {
  let classes = [styles[props.btntype]];
  if (props.disabled) {
    classes = [styles[props.btntype], styles.Disabled];
  }
  return (
    <Button
      disabled={props.disabled}
      className={classes.join(" ")}
      onClick={props.clicked}
      size={props.small ? "small" : "medium"}
    >
      {props.children}
    </Button>
  );
}
