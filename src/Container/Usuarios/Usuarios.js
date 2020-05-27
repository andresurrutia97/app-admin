import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./Usuarios.module.scss";

import axios from "../../axios";
import WithErrorHandler from "../../Hoc/WithErrorHandler/WithErrorHandler";
import * as actions from "./store/actions";
import * as actionsAddVar from "../AñadirVarUserDisp/store/actions";

import TablaUsuarios from "../../Components/Tablas/Usuarios/Usuarios";
import TablaVariables from "../../Components/Tablas/Usuarios/Variables/Variables";
import Spinner from "../../Components/UI/Spinner/Spinner";
import Titulo from "../../Components/UI/Titulo/Titulo";
import Modal from "../../Components/UI/Modal/Modal";
import ButtonIcon from "../../Components/UI/ButtonIcon/ButtonIcon";
import MessageRes from "../../Components/UI/MessageRes/MessageRes";
import AñadirUsuario from "./AñadirUsuario.js/AñadirUsuario";
import AñadirVarUserDisp from "../AñadirVarUserDisp/AñadirVarUserDisp";

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
      //Id del usuario seleccionado
      selectedUserId: null,
      //añadir variable
      addVarOpen: false,
    };
  }

  componentDidMount() {
    this.props.onFetchUsers();
  }

  //Abrir el modal para agregar un usuario
  addUserModalHandler = () => {
    this.setState({ updateInfo: null, updateMode: false, addOpen: true });
  };

  //Abrir el modal para agregar un usuario
  closeModalHandler = () => {
    this.setState({ addOpen: false });
  };

  //abre el modal para añadir variable a usuario
  addVarModalHandler = () => {
    this.setState({ addVarOpen: true });
  };

  //cierra el modal para añadir variable a usuario
  closeAddVarModalHandler = () => {
    this.setState({ addVarOpen: false });
  };

  //Controlador para mostrar un mensaje de alerta
  messageResOpen = () => {
    this.setState({ openAlert: true });
    setTimeout(() => {
      this.setState({ openAlert: false });
    }, 5000);
  };

  //Obtener el id del usuario seleccionado en la tabla
  getClickedUserId = (id) => {
    this.props.onFetchUserInfo(id);
    this.setState({ selectedUserId: id });
  };

  //Funcion para añadir un usuario
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

  //Funcion para eliminar un usuario
  deleteUserHandler = (id) => {
    this.setState({ addMode: false, deleteMode: true, updateMode: false });
    this.props.onDeleteUser(id);
    // this.messageResOpen();
  };

  //Abre el el modal agregar usuario en modod actualizar datos
  openUpdateUserHandler = (updateData) => {
    this.setState({
      updateInfo: updateData,
      updateMode: true,
      addOpen: true,
      addMode: false,
      deleteMode: false,
    });
  };

  //Funxcion para actualizar la informacion del usuario
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

  //Funcion para agregar una variable a un usuario
  addVarHandler = (data) => {
    const id = this.state.selectedUserId;
    console.log(data);
    this.props.onAddVar(id, data);
    this.props.onFetchUserInfo();

    // this.messageResOpen();
  };

  deleteVarHandler = (id) => {
    console.log(this.state.selectedUserId, id);
    this.props.onDeleteVar(this.state.selectedUserId, id);
    this.props.onFetchUserInfo();
  };

  render() {
    let users = <Spinner />;
    if (!this.props.loadingUsers) {
      users = (
        <div className={styles.TableContainer}>
          <div className={styles.TableUsers}>
            <TablaUsuarios
              users={this.props.users}
              clickedUser={this.getClickedUserId}
              deleteUser={this.deleteUserHandler}
              updateUser={this.openUpdateUserHandler}
            />
          </div>
          <div className={styles.TableUserVar}>
            <TablaVariables
              userId={this.state.selectedUserId}
              data={this.props.varInfo}
              openAddVar={this.addVarModalHandler}
              deleteVar={this.deleteVarHandler}
            />
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
          <Modal
            open={this.state.addVarOpen}
            close={this.closeAddVarModalHandler}
          >
            <AñadirVarUserDisp
              open={this.state.addVarOpen}
              close={this.closeAddVarModalHandler}
              addVar={this.addVarHandler}
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
    loadingAddVar: state.addVars.loadingVars,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUsers: () => dispatch(actions.fetchUsers()),
    onFetchUserInfo: (id) => dispatch(actions.showUserVars(id)),
    onAddUser: (data) => dispatch(actions.addUser(data)),
    onDeleteUser: (id) => dispatch(actions.deleteUser(id)),
    onUpdateUser: (id, data) => dispatch(actions.updateUser(id, data)),
    onAddVar: (id, data) => dispatch(actions.addVar(id, data)),
    onDeleteVar: (idUser, idVar) => dispatch(actions.deleteVar(idUser, idVar)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(Usuarios, axios));
