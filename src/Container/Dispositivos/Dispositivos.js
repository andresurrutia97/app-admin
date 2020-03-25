import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import axios from "../../axios";
import WithErrorHandler from "../../Hoc/WithErrorHandler/WithErrorHandler";
import * as actions from "./store/actions";
import styles from "./Dispositivos.module.scss";
import Card from "../../Components/UI/Card/Card";
import Titulo from "../../Components/UI/Titulo/Titulo";
import Spinner from "../../Components/UI/Spinner/Spinner";

export class Dispositivos extends Component {
  disp = {
    nombre: "Arduino",
    indicador: "Huella de carbono",
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod"
  };

  componentDidMount() {
    this.props.onFetchDisps();
  }
  render() {
    let disps = <Spinner />;
    if (!this.props.loadingDisps) {
      console.log(this.props.dispositivos);
      disps = this.props.dispositivos.map(dis => {
        return (
          <Card
            nombre={dis.disp}
            indicador={dis.indicador}
            desc={dis.descripcion}
          />
        );
      });
    }
    return (
      <Fragment>
        <div>
          <Titulo>Dispositivos</Titulo>
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
  return { onFetchDisps: () => dispatch(actions.fetchDisps()) };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(Dispositivos, axios));
