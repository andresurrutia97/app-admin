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

export class Usuarios extends Component {
  componentDidMount() {
    this.props.onFetchUsers();
  }

  render() {
    let users = <Spinner />;
    if (!this.props.loadingUsers) {
      users = (
        <div className={styles.TableContainer}>
          <div className={styles.TableUsers}>
            <TablaUsuarios
              users={this.props.users}
              clickedUser={this.props.onFetchUserInfo}
            />
          </div>
          <div className={styles.TableUserVar}>
            <TablaVariables data={this.props.varInfo} />
          </div>
        </div>
      );
    }
    return (
      <React.Fragment>
        <Titulo>Usuarios</Titulo>
        {users}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users.users,
    loadingUsers: state.users.loading,
    varInfo: state.users.userVarInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchUsers: () => dispatch(actions.fetchUsers()),
    onFetchUserInfo: id => dispatch(actions.showUserVars(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(Usuarios, axios));
