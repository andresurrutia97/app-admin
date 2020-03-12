import React from "react";
import Button from "@material-ui/core/Button";
import Add from "@material-ui/icons/Add";
import styles from "./Button.module.scss";

export default function IconLabelButtons(props) {
  return (
    <div>
      <Button
        className={styles.Button}
        onClick={props.clicked}
        startIcon={<Add />}
      >
        {props.children}
      </Button>
    </div>
  );
}
