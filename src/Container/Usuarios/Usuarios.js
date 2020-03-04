import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./Usuarios.module.scss";

import axios from "../../axios";
import WithErrorHandler from "../../Hoc/WithErrorHandler/WithErrorHandler";
import * as actions from "./store/actions";
import TablaUsuarios from "../../Components/Tablas/Usuarios/Usuarios";
import TablaVariables from "../../Components/Tablas/Usuarios/Variables/Variables";
import Spinner from "../../Components/UI/Spinner/Spinner";

export class Usuarios extends Component {
  componentDidMount() {
    this.props.onFetchUsers();
  }

  aux = () => {
    //this.props.onFetchUserInfo();
    // let varInfo = [];
    // if (this.props.userId != null) {
    //   for (let user in this.props.users) {
    //     if (this.props.users[user].id === this.props.userId) {
    //       varInfo = this.props.users[user].variables;
    //       console.log(varInfo);
    //       return varInfo;
    //     }
    //   }
    // }
    return this.props.varInfo;
  };

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
      <div className={styles.Users}>
        <div className={styles.Title}>Usuarios</div>
        {users}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users.users,
    loadingUsers: state.users.loading,
    varInfo: state.users.varInfo
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
