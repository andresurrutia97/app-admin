import React from "react";
import styles from "./Card.module.scss";

const Card = props => {
  return (
    <div className={styles.Card}>
      <div className={styles.Name}>{props.nombre}</div>
      <div className={styles.Indicator}>{props.indicador}</div>
      <div className={styles.Desc}>{props.desc}</div>
      <div className={styles.Actions}>
        <div className={styles.Delete} onClick={props.delete}>
          Eliminar
        </div>
        <div className={styles.More} onClick={props.more}>
          Ver más
        </div>
      </div>
    </div>
  );
};

export default Card;
