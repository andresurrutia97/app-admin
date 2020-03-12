import React, { Component } from "react";
import { connect } from "react-redux";

import styles from "./Variables.module.scss";
import axios from "../../axios";
import WithErrorHandler from "../../Hoc/WithErrorHandler/WithErrorHandler";
import * as actions from "./store/actions";
import TablaVariables from "../../Components/Tablas/Variables/Variables";
import Spinner from "../../Components/UI/Spinner/Spinner";
import Titulo from "../../Components/UI/Titulo/Titulo";
import añadirVariable from "./AñadirVariable/AñadirVariable";
import Modal from "../../Components/UI/Modal/Modal";

import ButtonIcon from "../../Components/UI/ButtonIcon/ButtonIcon";

export class Variables extends Component {
  state = {
    addOpen: false
  };
  componentDidMount() {
    this.props.onFetchVars();
  }

  addVarHandler = () => {
    this.setState({ addOpen: true });
  };

  closeModalHandler = () => {
    this.setState({ addOpen: false });
  };

  render() {
    let vars = <Spinner />;
    if (!this.props.loadingVars) {
      vars = <TablaVariables vars={this.props.vars} />;
    }

    return (
      <React.Fragment>
        <div className={styles.Header}>
          <Titulo>Variables</Titulo>
          <Modal
            btnLabel={"Añadir"}
            open={this.state.addOpen}
            close={this.closeModalHandler}
          >
            <añadirVariable />
          </Modal>
          <ButtonIcon clicked={this.addVarHandler}>Añadir</ButtonIcon>
        </div>

        {vars}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    vars: state.vars.vars,
    loadingVars: state.vars.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchVars: () => dispatch(actions.fetchVars())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(Variables, axios));
