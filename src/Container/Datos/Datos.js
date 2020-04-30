import React, { Component } from "react";

import styles from "./Datos.module.scss";

import TablaDatos from "../../Components/Tablas/Datos/Datos";
import Titulo from "../../Components/UI/Titulo/Titulo";
import ButtonIcon from "../../Components/UI/ButtonIcon/ButtonIcon";
import Spinner from "../../Components/UI/Spinner/Spinner";

export class Datos extends Component {
  render() {
    let datos = <Spinner />;
    if (!this.props.loadingVars) {
      datos = (
        <TablaDatos
          vars={[]}
          // deleteVar={this.deleteVarHandler}
          // updateVar={this.openUpdateVarHandler}
        />
      );
    }
    return (
      <React.Fragment>
        <div className={styles.Header}>
          <Titulo>Usuarios</Titulo>
          {/* {alert} */}
          {/* <Modal open={this.state.addOpen} close={this.closeModalHandler}>
            <AñadirUsuario
              open={this.state.addOpen}
              close={this.closeModalHandler}
              addUser={this.addUserHandler}
              updateUser={this.updateUserHandler}
              updateMode={this.state.updateMode}
              updateData={this.state.updateInfo}
              // openMess={this.messageResOpen}
            />
          </Modal> */}
          <ButtonIcon>Añadir</ButtonIcon>
        </div>
        {datos}
      </React.Fragment>
    );
  }
}

export default Datos;
