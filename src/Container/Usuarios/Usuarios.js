import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./Usuarios.module.scss";

import axios from "../../axios";
import WithErrorHandler from "../../Hoc/WithErrorHandler/WithErrorHandler";
import * as actions from "./store/actions";
import TablaUsuarios from "../../Components/Tablas/Usuarios/Usuarios";
import TablaVariables from "../../Components/Tablas/Usuarios/Variables/Variables";
import Spinner from "../../Components/UI/Spinner/Spinner";
import Titulo from "../../Components/UI/Titulo/Titulo";
import Modal from "../../Components/UI/Modal/Modal";
import ButtonIcon from "../../Components/UI/ButtonIcon/ButtonIcon";
import MessageRes from "../../Components/UI/MessageRes/MessageRes";
import AñadirUsuario from "./AñadirUsuario.js/AñadirUsuario";

export class Usuarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addOpen: false,
      updateInfo: null,
      addMode: false,
      updateMode: false,
      deleteMode: false,
      openAlert: false,
    };
  }

  componentDidMount() {
    this.props.onFetchUsers();
  }

  addUserModalHandler = () => {
    this.setState({ updateInfo: null, updateMode: false, addOpen: true });
  };

  closeModalHandler = () => {
    this.setState({ addOpen: false });
  };

  messageResOpen = () => {
    this.setState({ openAlert: true });
    setTimeout(() => {
      this.setState({ openAlert: false });
    }, 5000);
  };

  addUserHandler = (data) => {
    this.setState({ addMode: true, deleteMode: false, updateMode: false });
    // console.log(data);
    //auxiliar para simular datos ya que no se esta conectado a la base de datos de la U
    const auxInfouser = {
      ...data,
      cargo: "Contratista",
      dependencia: "Ingenieria",
      extension: "12314",
      ingresoP: "Hoy",
      nombre: "test",
      perfil: "Admin",
    };
    this.props.onAddUser(auxInfouser);
    this.messageResOpen();
  };

  deleteUserHandler = (id) => {
    this.setState({ addMode: false, deleteMode: true, updateMode: false });
    this.props.onDeleteUser(id);
    // this.messageResOpen();
  };

  openUpdateUserHandler = (updateData) => {
    this.setState({
      updateInfo: updateData,
      updateMode: true,
      addOpen: true,
      addMode: false,
      deleteMode: false,
    });
  };

  updateUserHandler = (data, id) => {
    console.log(id);
    let aux = {};
    for (let dt in data) {
      if (data[dt] !== this.state.updateInfo[dt]) {
        aux[dt] = data[dt];
      }
    }
    this.props.onUpdateUser(id, aux);
    // this.messageResOpen();
  };

  render() {
    let users = <Spinner />;
    if (!this.props.loadingUsers) {
      users = (
        <div className={styles.TableContainer}>
          <div className={styles.TableUsers}>
            <TablaUsuarios
              users={this.props.users}
              clickedUser={this.props.onFetchUserInfo}
              deleteUser={this.deleteUserHandler}
              updateUser={this.openUpdateUserHandler}
            />
          </div>
          <div className={styles.TableUserVar}>
            <TablaVariables data={this.props.varInfo} />
          </div>
        </div>
      );
    }

    // let messageRes = [];
    // if (
    //   !this.props.loadingAdd &&
    //   this.props.addResponse !== null &&
    //   this.state.addMode
    // ) {
    //   if (this.props.addResponse.status === 200) {
    //     messageRes = ["Variable añadida con exito", "success"];
    //   } else {
    //     messageRes = ["Variable añadida con exito", "error"];
    //   }
    // }

    // if (
    //   !this.props.loadingDelete &&
    //   this.props.deleteResponse !== null &&
    //   this.state.deleteMode
    // ) {
    //   if (this.props.deleteResponse.status === 200) {
    //     messageRes = ["Variable eliminada con exito", "success"];
    //   } else {
    //     messageRes = ["La variable no se puedo eliminar", "error"];
    //   }
    // }

    // if (
    //   !this.props.loadingUpdate &&
    //   this.props.updateResponse !== null &&
    //   this.state.updateMode
    // ) {
    //   if (this.props.updateResponse.status === 200) {
    //     messageRes = ["Variable actualizada con exito", "success"];
    //   } else {
    //     messageRes = ["La variable no se puedo actualizar", "error"];
    //   }
    // }

    // let alert = null;
    // if (messageRes !== []) {
    //   const text = messageRes[0];
    //   const type = messageRes[1];
    //   if (text && type) {
    //     alert = (
    //       <MessageRes open={this.state.openAlert} type={type}>
    //         {text}
    //       </MessageRes>
    //     );
    //   }
    // }
    return (
      <React.Fragment>
        <div className={styles.Header}>
          <Titulo>Usuarios</Titulo>
          {/* {alert} */}
          <Modal open={this.state.addOpen} close={this.closeModalHandler}>
            <AñadirUsuario
              open={this.state.addOpen}
              close={this.closeModalHandler}
              addUser={this.addUserHandler}
              updateUser={this.updateUserHandler}
              updateMode={this.state.updateMode}
              updateData={this.state.updateInfo}
              // openMess={this.messageResOpen}
            />
          </Modal>
          <ButtonIcon clicked={this.addUserModalHandler}>Añadir</ButtonIcon>
        </div>

        {users}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    loadingUsers: state.users.loading,
    varInfo: state.users.userVarInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUsers: () => dispatch(actions.fetchUsers()),
    onFetchUserInfo: (id) => dispatch(actions.showUserVars(id)),
    onAddUser: (data) => dispatch(actions.addUser(data)),
    onDeleteUser: (id) => dispatch(actions.deleteUser(id)),
    onUpdateUser: (id, data) => dispatch(actions.updateUser(id, data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(Usuarios, axios));
