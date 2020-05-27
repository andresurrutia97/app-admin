import React from "react";

import styles from "./Calculadora.module.scss";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "../../UI/Button/Button";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    "& label.Mui-focused": {
      color: "#62bc50",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#62bc50",
    },
  },
}));

const Calculadora = (props) => {
  const classes = useStyles();
  return (
    <div className={styles.Container}>
      <span className={styles.Title}>{props.title}</span>
      <span className={styles.subTitle}>{props.subTitle}</span>
      <TextField
        id="date"
        label="Fecha inicial"
        type="date"
        defaultValue="2020-01-01"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        style={{ marginBottom: "20px" }}
      />
      <TextField
        id="date"
        label="Fecha final"
        type="date"
        defaultValue="2020-01-01"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <div></div>
      <div className={styles.Btn}>
        <Button btntype="Success" cWidth="100%">
          Calcular
        </Button>
      </div>
      <div className={styles.Data}>{props.value}</div>
    </div>
  );
};

export default Calculadora;
