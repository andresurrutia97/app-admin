import React from "react";
import styles from "./Toolbar.module.scss";
import ToogleButton from "../ToogleButton/ToogleButton";
import { withRouter } from "react-router-dom";
import { routes } from "../Routes/Routes";

const Toolbar = props => {
  // console.log(props.history);
  // console.log(props.history.location.pathname);

  const titlePag = () => {
    for (let rt in routes) {
      if (props.history.location.pathname === routes[rt].path) {
        return routes[rt].name;
      }
    }
  };

  return (
    <div className={styles.Toolbar}>
      <div className={styles.icono}>
        <ToogleButton clicked={props.open} />
      </div>
      <div className={styles.Titulo}>{titlePag()}</div>
    </div>
  );
};

export default withRouter(Toolbar);
