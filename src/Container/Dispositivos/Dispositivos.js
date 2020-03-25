import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import axios from "../../axios";
import WithErrorHandler from "../../Hoc/WithErrorHandler/WithErrorHandler";
import * as actions from "./store/actions";
import styles from "./Dispositivos.module.scss";
import Card from "../../Components/UI/Card/Card";
import Titulo from "../../Components/UI/Titulo/Titulo";
import Spinner from "../../Components/UI/Spinner/Spinner";
import ButtonIcon from "../../Components/UI/ButtonIcon/ButtonIcon";
import Modal from "../../Components/UI/Modal/Modal";
import AñadirDispositivo from "./AñadirDispositivo/AñadirDispositivo";

export class Dispositivos extends Component {
  constructor() {
    super();
    this.state = {
      addOpen: false,
      updateInfo: null,
      addMode: false,
      updateMode: false,
      deleteMode: false,
      openAlert: false
    };
  }

  componentDidMount() {
    this.props.onFetchDisps();
  }

  addDispModalHandler = () => {
    this.setState({ updateInfo: null, updateMode: false, addOpen: true });
  };

  closeModalHandler = () => {
    this.setState({ addOpen: false });
  };

  addDispHandler = data => {
    this.setState({ addMode: true, deleteMode: false, updateMode: false });
    this.props.onAddDisp(data);
    // this.messageResOpen();
  };

  render() {
    let disps = <Spinner />;
    if (!this.props.loadingDisps) {
      // console.log(this.props.dispositivos);
      disps = this.props.dispositivos.map(dis => {
        return (
          <Card
            key={dis.id}
            nombre={dis.dispositivo}
            indicador={dis.indicador}
            desc={dis.descripcion}
          />
        );
      });
    }
    return (
      <Fragment>
        <div className={styles.Header}>
          <Titulo>Dispositivos</Titulo>
          <Modal open={this.state.addOpen} close={this.closeModalHandler}>
            <AñadirDispositivo
              open={this.state.addOpen}
              close={this.closeModalHandler}
              addDisp={this.addDispHandler}
              updateVar={this.updateVarHandler}
              updateMode={this.state.updateMode}
              updateData={this.state.updateInfo}
              // openMess={this.messageResOpen}
            />
          </Modal>
          <ButtonIcon clicked={this.addDispModalHandler}>Añadir</ButtonIcon>
        </div>
        <div className={styles.Content}>{disps}</div>
      </Fragment>
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
    onFetchDisps: () => dispatch(actions.fetchDisps()),
    onAddDisp: dispData => dispatch(actions.addDisp(dispData))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(Dispositivos, axios));
