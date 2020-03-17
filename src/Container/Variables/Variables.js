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
import { updateObject } from "../../shared/utility";

export class Variables extends Component {
  state = {
    addOpen: false,
    updateInfo: null,
    updateMode: false
  };
  componentDidMount() {
    this.props.onFetchVars();
    // console.log(this.state.updateMode);
  }

  addVarModalHandler = () => {
    this.setState({ updateInfo: null, updateMode: false, addOpen: true });
  };

  closeModalHandler = () => {
    this.setState({ addOpen: false });
  };

  addVArHandler = data => {
    this.props.onAddVar(data);
  };

  openUpdateVarHandler = updateData => {
    this.setState({ updateInfo: updateData, updateMode: true, addOpen: true });
  };

  updateVarHandler = (data, id) => {
    let aux = {};
    for (let dt in data) {
      if (data[dt] !== this.state.updateInfo[dt]) {
        aux[dt] = data[dt];
      }
    }
    this.props.onUpdateVar(id, aux);
  };

  render() {
    let vars = <Spinner />;
    if (!this.props.loadingVars) {
      vars = (
        <TablaVariables
          vars={this.props.vars}
          deleteVar={this.props.onDeleteVar}
          updateVar={this.openUpdateVarHandler}
        />
      );
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
            <AñadirVariable
              open={this.state.addOpen}
              close={this.closeModalHandler}
              addVar={this.addVArHandler}
              updateVar={this.updateVarHandler}
              updateMode={this.state.updateMode}
              updateData={this.state.updateInfo}
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
    loadingVars: state.vars.loading
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
