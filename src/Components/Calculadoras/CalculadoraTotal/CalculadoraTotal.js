import React from "react";

import styles from "./CalculadoraTotal.module.scss";
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

const CalculadoraTotal = (props) => {
  const classes = useStyles();
  return (
    <div className={styles.Container}>
      <span className={styles.Title}>{props.title}</span>
      <TextField
        id="date"
        label="Fecha"
        type="date"
        defaultValue="2020-01-01"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <div className={styles.Data}>{props.value}</div>
      <div className={styles.Btn}>
        <Button btntype="Success" cWidth="100%">
          Calcular
        </Button>
      </div>
    </div>
  );
};

export default CalculadoraTotal;
