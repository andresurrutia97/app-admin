import React, { Component } from "react";

import styles from "./Calculadoras.module.scss";
import shared from "../../styles/shared.module.scss";
import Calculadora from "../../Components/Calculadoras/Calculadora/Calculadora";
import CalculadoraTotal from "../../Components/Calculadoras/CalculadoraTotal/CalculadoraTotal";
import Titulo from "../../Components/UI/Titulo/Titulo";
import ButtonIcon from "../../Components/UI/ButtonIcon/ButtonIcon";
import Spinner from "../../Components/UI/Spinner/Spinner";

export class Calculadoras extends Component {
  render() {
    return (
      <React.Fragment>
        <div className={shared.Header}>
          <Titulo>Calculadoras</Titulo>
        </div>
        <div className={styles.Calcs}>
          <div className={styles.Content}>
            <Calculadora
              title="Huella de carbono"
              subTitle="Alcance 1"
              value={"12323 Kg"}
            />
            <Calculadora
              title="Huella de carbono"
              subTitle="Alcance 2"
              value={"9352 Kg"}
            />
            <Calculadora
              title="Huella de carbono"
              subTitle="Alcance 3"
              value={"45678 Kg"}
            />
          </div>
          <div className={styles.calcT}>
            <CalculadoraTotal
              title="Huella de carbono Total"
              subTitle="Alcance 3"
              value={"45678 Kg"}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Calculadoras;
