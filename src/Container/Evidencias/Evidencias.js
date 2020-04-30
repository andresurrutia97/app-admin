import React, { Component } from "react";

import styles from "./Evidencias.module.scss";

import TablaEvidencia from "../../Components/Tablas/Evidencias/Evidencias";
import Titulo from "../../Components/UI/Titulo/Titulo";
import ButtonIcon from "../../Components/UI/ButtonIcon/ButtonIcon";
import Spinner from "../../Components/UI/Spinner/Spinner";

export class Evidencias extends Component {
  render() {
    let datos = <Spinner />;
    if (!this.props.loadingVars) {
      datos = (
        <TablaEvidencia
          vars={[]}
          // deleteVar={this.deleteVarHandler}
          // updateVar={this.openUpdateVarHandler}
        />
      );
    }
    return (
      <React.Fragment>
        <div className={styles.Header}>
          <Titulo>Evidencias</Titulo>
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

export default Evidencias;
