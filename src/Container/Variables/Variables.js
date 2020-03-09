import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "../../axios";
import WithErrorHandler from "../../Hoc/WithErrorHandler/WithErrorHandler";
import * as actions from "./store/actions";
import TablaVariables from "../../Components/Tablas/Variables/Variables";
import Spinner from "../../Components/UI/Spinner/Spinner";
import Titulo from "../../Components/UI/Titulo/Titulo";

export class Variables extends Component {
  componentDidMount() {
    this.props.onFetchVars();
  }

  render() {
    let vars = <Spinner />;
    if (!this.props.loadingVars) {
      vars = <TablaVariables vars={this.props.vars} />;
    }
    return (
      <React.Fragment>
        <Titulo>Variables</Titulo>
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
