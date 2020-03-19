import React, { Component } from "react";
import { connect } from "react-redux";

import styles from "./Variables.module.scss";
import axios from "../../axios";
import WithErrorHandler from "../../Hoc/WithErrorHandler/WithErrorHandler";
import * as actions from "./store/actions";
import TablaVariables from "../../Components/Tablas/Variables/Variables";
import Spinner from "../../Components/UI/Spinner/Spinner";
import Titulo from "../../Components/UI/Titulo/Titulo";
import AñadirVariable from "./AñadirVariable/AñadirVariable";
import Modal from "../../Components/UI/Modal/Modal";
import ButtonIcon from "../../Components/UI/ButtonIcon/ButtonIcon";
import MessageRes from "../../Components/UI/MessageRes/MessageRes";
import { updateObject } from "../../shared/utility";

export class Variables extends Component {
  state = {
    addOpen: false,
    updateInfo: null,
    addMode: false,
    updateMode: false,
    deleteMode: false,
    openAlert: false
  };
  componentDidMount() {
    this.props.onFetchVars();
  }

  addVarModalHandler = () => {
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

  addVArHandler = data => {
    this.setState({ addMode: true, deleteMode: false, updateMode: false });
    this.props.onAddVar(data);
    this.messageResOpen();
  };

  deleteVarHandler = () => {
    this.setState({ addMode: false, deleteMode: true, updateMode: false });
    this.props.onDeleteVar();
    this.messageResOpen();
  };

  openUpdateVarHandler = updateData => {
    this.setState({
      updateInfo: updateData,
      updateMode: true,
      addOpen: true,
      addMode: false,
      deleteMode: false
    });
  };

  updateVarHandler = (data, id) => {
    // console.log(data);
    let aux = {};
    for (let dt in data) {
      if (data[dt] !== this.state.updateInfo[dt]) {
        aux[dt] = data[dt];
      }
    }
    this.props.onUpdateVar(id, aux);
    this.messageResOpen();
  };

  render() {
    let vars = <Spinner />;
    if (!this.props.loadingVars) {
      vars = (
        <TablaVariables
          vars={this.props.vars}
          deleteVar={this.deleteVarHandler}
          updateVar={this.openUpdateVarHandler}
        />
      );
    }

    let messageRes = [];
    if (
      !this.props.loadingAdd &&
      this.props.addResponse !== null &&
      this.state.addMode
    ) {
      if (this.props.addResponse.status === 200) {
        messageRes = ["Variable añadida con exito", "success"];
      } else {
        messageRes = ["Variable añadida con exito", "error"];
      }
    }

    if (
      !this.props.loadingDelete &&
      this.props.deleteResponse !== null &&
      this.state.deleteMode
    ) {
      if (this.props.deleteResponse.status === 200) {
        messageRes = ["Variable eliminada con exito", "success"];
      } else {
        messageRes = ["La variable no se puedo eliminar", "error"];
      }
    }

    if (
      !this.props.loadingUpdate &&
      this.props.updateResponse !== null &&
      this.state.updateMode
    ) {
      if (this.props.updateResponse.status === 200) {
        messageRes = ["Variable actualizada con exito", "success"];
      } else {
        messageRes = ["La variable no se puedo actualizar", "error"];
      }
    }

    let alert = null;
    if (messageRes !== []) {
      const text = messageRes[0];
      const type = messageRes[1];
      if (text && type) {
        alert = (
          <MessageRes open={this.state.openAlert} type={type}>
            {text}
          </MessageRes>
        );
      }
    }

    return (
      <React.Fragment>
        <div className={styles.Header}>
          <Titulo>Variables</Titulo>
          {alert}
          <Modal open={this.state.addOpen} close={this.closeModalHandler}>
            <AñadirVariable
              open={this.state.addOpen}
              close={this.closeModalHandler}
              addVar={this.addVArHandler}
              updateVar={this.updateVarHandler}
              updateMode={this.state.updateMode}
              updateData={this.state.updateInfo}
              // openMess={this.messageResOpen}
            />
          </Modal>
          <ButtonIcon clicked={this.addVarModalHandler}>Añadir</ButtonIcon>
        </div>

        {vars}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    vars: state.vars.vars,
    loadingVars: state.vars.loading,
    loadingAdd: state.vars.loadingAdd,
    addResponse: state.vars.addResponse,
    loadingDelete: state.vars.loadingDelete,
    deleteResponse: state.vars.deleteResponse,
    loadingUpdate: state.vars.loadingUpdate,
    updateResponse: state.vars.updateResponse
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchVars: () => dispatch(actions.fetchVars()),
    onAddVar: varData => dispatch(actions.addVar(varData)),
    onDeleteVar: id => dispatch(actions.deleteVar(id)),
    onUpdateVar: (id, data) => dispatch(actions.updateVar(id, data))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(Variables, axios));
