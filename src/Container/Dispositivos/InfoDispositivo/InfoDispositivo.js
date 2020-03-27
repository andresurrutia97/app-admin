import React, { Component } from "react";
import styles from "./InfoDispositivo.module.scss";
import Map from "../Map/Map";
import Variables from "../../../Components/Tablas/Dispositivos/Variables/Variables";

export class InfoDispositivo extends Component {
  dispInfo = this.props.location.state;

  render() {
    console.log(this.dispInfo);
    const nombre = this.dispInfo.dispositivo;
    const marca = this.dispInfo.marca;
    const modelo = this.dispInfo.modelo;
    const indicador = this.dispInfo.indicador;
    const desc = this.dispInfo.descripcion;
    const varData = this.dispInfo.variables;
    const coordenadas = this.dispInfo.coordenadas;
    // console.log(this.dispInfo);
    return (
      <div className={styles.Root}>
        <div className={styles.Header}>
          <h2>{nombre}</h2>
          <div className={styles.Buttons}>
            <button>eliminar</button>
            <button>modificar</button>
          </div>
        </div>
        <div className={styles.newHr} />
        <div className={styles.Subtitle}>Descripción del dispositvo</div>
        <div className={styles.Content}>
          <div className={styles.Content_MainItems}>
            <div>
              <h3>Nombre</h3>
              <span>{nombre}</span>
            </div>
            <div>
              <h3>Marca</h3>
              <span>{marca}</span>
            </div>
            <div>
              <h3>Modelo</h3>
              <span>{modelo}</span>
            </div>
            <div>
              <h3>Indicador</h3>
              <span>{indicador}</span>
            </div>
          </div>
          <div className={styles.Content_Desc}>
            <h3>Descripcion</h3>
            <div>{desc}</div>
          </div>
          <div className={styles.Content_varUbiItems}>
            <div className={styles.Variables}>
              <h3>Variables</h3>
              <div className={styles.Variables_tabla}>
                <Variables data={varData} />
              </div>
            </div>
            <div className={styles.Ubicacion}>
              <h3>Ubicación</h3>
              <div className={styles.Ubicacion_Map}>
                <Map info={true} coor={coordenadas} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InfoDispositivo;
