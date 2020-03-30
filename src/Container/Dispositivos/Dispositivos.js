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
      addMode: false,
      openAlert: false
    };
  }

  componentDidMount() {
    this.props.onFetchDisps();
  }

  //Abre el modal para agregar dipositivo
  addDispModalHandler = () => {
    this.setState({ addOpen: true });
  };

  //Cierra el modal para agregar dipositivo
  closeModalHandler = () => {
    this.setState({ addOpen: false });
  };

  //Se encarga de recibir la informacion del nuevo dispositivo
  //y hacer la conexion con la funcion del reducer para agregar el nuevo dispositvo
  addDispHandler = data => {
    this.setState({ addMode: true });
    this.props.onAddDisp(data);
    // this.messageResOpen();
  };

  //funcion que se pasa a cada card para que envíe al compoenente de
  // información del dispositivo
  goTo = params => {
    this.props.history.push({
      pathname: "/infoDispo",
      state: { params: params, modalOPen: this.addDispModalHandler() }
    });
  };

  render() {
    let disps = <Spinner />;
    if (!this.props.loadingDisps) {
      disps = this.props.dispositivos.map(dis => {
        return (
          <Card
            key={dis.id}
            nombre={dis.dispositivo}
            indicador={dis.indicador}
            desc={dis.descripcion}
            more={() => this.goTo(dis)}
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
