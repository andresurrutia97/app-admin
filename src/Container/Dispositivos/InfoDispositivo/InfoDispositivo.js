import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "../../../axios";
import WithErrorHandler from "../../../Hoc/WithErrorHandler/WithErrorHandler";
import * as actions from "../store/actions";
import * as actionsAddVar from "../../AñadirVarUserDisp/store/actions";

import styles from "./InfoDispositivo.module.scss";
import Map from "../Map/Map";
import Variables from "../../../Components/Tablas/Dispositivos/Variables/Variables";
import Modal from "../../../Components/UI/Modal/Modal";
import AñadirDispositivo from "../AñadirDispositivo/AñadirDispositivo";
import Button from "../../../Components/UI/Button/Button";
import AñadirVarUserDisp from "../../AñadirVarUserDisp/AñadirVarUserDisp";

export class InfoDispositivo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addOpen: false,
      updateInfo: null,
      updateMode: false,
      deleteMode: false,
      openAlert: false,
      //añadir variable
      addVarDispOpen: false,
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

  //abre el modal para añadir variable a dispositivo
  addVarDispModalHandler = () => {
    this.setState({ addVarDispOpen: true });
  };

  //cierra el modal para añadir variable a dispositivo
  closeAddVarDispModalHandler = () => {
    this.setState({ addVarDispOpen: false });
  };

  //Funcion para actualizar la informacion del dispositivo a modificar
  openUpdateDispHandler = (updateData) => {
    this.setState({
      updateInfo: updateData,
      updateMode: true,
      addOpen: true,
      deleteMode: false,
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

  //Funcion para borrar un dispositivo
  deleteDispHandler = (id) => {
    this.setState({ deleteMode: true, updateMode: false });
    this.props.onDeleteDisp(id);
    this.props.history.goBack();
    // this.messageResOpen();
  };

  //Añadir variable
  addVarHandler = (data) => {
    const id = this.dispInfo.id;
    this.props.onAddVar(id, data);
    setTimeout(() => {
      this.props.history.push("/dispositivos");
    }, 500);
    //
    // this.messageResOpen();
  };

  deleteVarHandler = (id) => {
    const idDisp = this.dispInfo.id;
    console.log(idDisp, id);
    this.props.onDeleteVar(idDisp, id);
    setTimeout(() => {
      this.props.history.push("/dispositivos");
    }, 500);
    // this.props.onFetchUserInfo();
  };

  render() {
    const nombre = this.dispInfo.dispositivo;
    const marca = this.dispInfo.marca;
    const modelo = this.dispInfo.modelo;
    const indicador = this.dispInfo.indicador;
    const desc = this.dispInfo.descripcion;
    const varData = this.dispInfo.variables;
    const coordenadas = this.dispInfo.coordenadas;
    // console.log(varData);

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
        <Modal
          open={this.state.addVarDispOpen}
          close={this.closeAddVarDispModalHandler}
        >
          <AñadirVarUserDisp
            open={this.state.addVarDispOpen}
            close={this.closeAddVarDispModalHandler}
            addVar={this.addVarHandler}
          />
        </Modal>
        <div className={styles.Header}>
          <h2>{nombre}</h2>
          <div className={styles.Buttons}>
            <Button
              small
              btntype={"Cancel"}
              clicked={() => this.deleteDispHandler(this.dispInfo.id)}
            >
              Eliminar
            </Button>
            <Button
              small
              btntype={"Success"}
              clicked={this.openUpdateDispHandler}
            >
              Modificar
            </Button>
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
            <div className={styles.Ubicacion}>
              <h3>Ubicación</h3>
              <div className={styles.Ubicacion_Map}>
                <Map info={true} coor={coordenadas} />
              </div>
            </div>
            <div className={styles.Variables}>
              {/* <div className={styles.variablesHeader}>
                <h3>Variables</h3>
                <Button
                  small
                  btntype={"Success"}
                  clicked={this.addVarDispModalHandler}
                >
                  Añadir
                </Button>
              </div> */}

              <div className={styles.Variables_tabla}>
                <Variables
                  data={varData}
                  openAddVar={this.addVarDispModalHandler}
                  deleteVar={this.deleteVarHandler}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dispositivos: state.disps.dispositivos,
    loadingDisps: state.disps.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateDisp: (id, data) => dispatch(actions.updateDisp(id, data)),
    onDeleteDisp: (id) => dispatch(actions.deleteDisp(id)),
    onAddVar: (id, data) => dispatch(actions.addVar(id, data)),
    onDeleteVar: (idDisp, idVar) => dispatch(actions.deleteVar(idDisp, idVar)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(InfoDispositivo, axios));
