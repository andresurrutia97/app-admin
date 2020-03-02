import React from "react";
import styles from "./Toolbar.module.scss";
import ToogleButton from "../ToogleButton/ToogleButton";
import { withRouter } from "react-router-dom";
import Routes from "../../../Routes";

const Toolbar = props => {
  // console.log(props.history);
  // console.log(props.history.location.pathname);

  const titlePag = () => {
    for (let rt in Routes) {
      if (props.history.location.pathname === Routes[rt].path) {
        return Routes[rt].name;
      }
    }
  };

  return (
    <div className={styles.Container}>
      <div className={styles.Toolbar}>
        <div className={styles.icono}>
          <ToogleButton clicked={props.open} />
        </div>
        <div className={styles.Titulo}>{titlePag()}</div>
      </div>
    </div>
  );
};

export default withRouter(Toolbar);
