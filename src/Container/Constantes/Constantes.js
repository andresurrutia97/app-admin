import React, { Component } from "react";
import { connect } from "react-redux";

import styles from "./Constantes.module.scss";
import axios from "../../axios";
import WithErrorHandler from "../../Hoc/WithErrorHandler/WithErrorHandler";
import * as actions from "./store/actions";

import TablaConstantes from "../../Components/Tablas/Constantes/Constantes";
import AñadirConstante from "./AñadirConstante/AñadirConstante";
import Titulo from "../../Components/UI/Titulo/Titulo";
import ButtonIcon from "../../Components/UI/ButtonIcon/ButtonIcon";
import Spinner from "../../Components/UI/Spinner/Spinner";
import Modal from "../../Components/UI/Modal/Modal";
import MessageRes from "../../Components/UI/MessageRes/MessageRes";

export class Constantes extends Component {
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
    this.props.onFetchConst();
  }

  addConstModalHandler = () => {
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

  addConstHandler = (data) => {
    this.setState({ addMode: true, deleteMode: false, updateMode: false });
    console.log(data);
    this.props.onAddConst(data);
    // this.messageResOpen();
  };

  deleteConstHandler = (id) => {
    this.setState({ addMode: false, deleteMode: true, updateMode: false });
    // this.props.onDeleteVar(id);
    // this.messageResOpen();
  };

  openUpdateConstHandler = (updateData) => {
    this.setState({
      updateInfo: updateData,
      updateMode: true,
      addOpen: true,
      addMode: false,
      deleteMode: false,
    });
  };

  updateConstHandler = (data, id) => {
    // console.log(data);
    let aux = {};
    for (let dt in data) {
      if (data[dt] !== this.state.updateInfo[dt]) {
        aux[dt] = data[dt];
      }
    }
    // this.props.onUpdateVar(id, aux);
    // this.messageResOpen();
  };

  render() {
    let datos = <Spinner />;
    if (!this.props.loadingConsts) {
      datos = (
        <TablaConstantes
          vars={this.props.consts}
          // deleteVar={this.deleteVarHandler}
          // updateVar={this.openUpdateVarHandler}
        />
      );
    }

    //Aquí va el message ress que esta en variables
    return (
      <React.Fragment>
        <div className={styles.Header}>
          <Titulo>Evidencias</Titulo>
          {/* {alert} */}
          <Modal open={this.state.addOpen} close={this.closeModalHandler}>
            <AñadirConstante
              open={this.state.addOpen}
              close={this.closeModalHandler}
              addConst={this.addConstHandler}
              //   updateUser={this.updateUserHandler}
              //   updateMode={this.state.updateMode}
              //   updateData={this.state.updateInfo}
              // openMess={this.messageResOpen}
            />
          </Modal>
          <ButtonIcon clicked={this.addConstModalHandler}>Añadir</ButtonIcon>
        </div>
        {datos}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    consts: state.const.consts,
    loadingConsts: state.const.loading,
    loadingAdd: state.const.loadingAdd,
    addResponse: state.const.addResponse,
    // loadingDelete: state.vars.loadingDelete,
    // deleteResponse: state.vars.deleteResponse,
    // loadingUpdate: state.vars.loadingUpdate,
    // updateResponse: state.vars.updateResponse,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchConst: () => dispatch(actions.fetchConst()),
    onAddConst: (constData) => dispatch(actions.addConst(constData)),
    // onDeleteVar: (id) => dispatch(actions.deleteVar(id)),
    // onUpdateVar: (id, data) => dispatch(actions.updateVar(id, data)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(Constantes, axios));
