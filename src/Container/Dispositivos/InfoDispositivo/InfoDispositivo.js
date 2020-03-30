import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "../../../axios";
import WithErrorHandler from "../../../Hoc/WithErrorHandler/WithErrorHandler";
import * as actions from "../store/actions";

import styles from "./InfoDispositivo.module.scss";
import Map from "../Map/Map";
import Variables from "../../../Components/Tablas/Dispositivos/Variables/Variables";
import Modal from "../../../Components/UI/Modal/Modal";
import AñadirDispositivo from "../AñadirDispositivo/AñadirDispositivo";

export class InfoDispositivo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addOpen: false,
      updateInfo: null,
      updateMode: false,
      deleteMode: false,
      openAlert: false
    };
  }
  dispInfo = this.props.location.state.params;

  //abre el modal para actualizar dispositivo
  addDispModalHandler = () => {
    this.setState({ updateInfo: null, updateMode: false, addOpen: true });
  };

  //cierra el modal para actualizar dispositivo
  closeModalHandler = () => {
    this.setState({ addOpen: false });
  };

  //Funcion para borrar un dispositivo
  deleteVarHandler = id => {
    this.setState({ deleteMode: true, updateMode: false });
    this.props.onDeleteVar(id);
    this.messageResOpen();
  };

  //Funcion para actualizar la informacion del dispositivo a modificar
  openUpdateDispHandler = updateData => {
    this.setState({
      updateInfo: updateData,
      updateMode: true,
      addOpen: true,
      deleteMode: false
    });
  };
  //Actualizar dispositivo
  updateDispHandler = (data, id) => {
    let aux = {};
    for (let dt in data) {
      if (data[dt] !== this.dispInfo[dt]) {
        aux[dt] = data[dt];
      }
    }
    this.props.onUpdateDisp(id, aux);
    this.props.history.goBack();
    // this.messageResOpen();
  };

  render() {
    const nombre = this.dispInfo.dispositivo;
    const marca = this.dispInfo.marca;
    const modelo = this.dispInfo.modelo;
    const indicador = this.dispInfo.indicador;
    const desc = this.dispInfo.descripcion;
    const varData = this.dispInfo.variables;
    const coordenadas = this.dispInfo.coordenadas;

    return (
      <div className={styles.Root}>
        <Modal open={this.state.addOpen} close={this.closeModalHandler}>
          <AñadirDispositivo
            open={this.state.addOpen}
            close={this.closeModalHandler}
            updateDisp={this.updateDispHandler}
            updateMode={this.state.updateMode}
            updateData={this.dispInfo}
            // openMess={this.messageResOpen}
          />
        </Modal>
        <div className={styles.Header}>
          <h2>{nombre}</h2>
          <div className={styles.Buttons}>
            <button>eliminar</button>
            <button onClick={this.openUpdateDispHandler}>modificar</button>
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

const mapStateToProps = state => {
  return {
    dispositivos: state.disps.dispositivos,
    loadingDisps: state.disps.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateDisp: (id, data) => dispatch(actions.updateDisp(id, data))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(InfoDispositivo, axios));
