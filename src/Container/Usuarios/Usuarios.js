import React, { Component } from "react";

import styles from "./Usuarios.module.scss";
import TablaUsuarios from "../../Components/Tablas/Usuarios/Usuarios";
import TablaVariables from "../../Components/Tablas/Usuarios/Variables/Variables";

export class Usuarios extends Component {
  state = {
    users: [
      {
        id: "1",
        nombre: "Andres",
        correo: "test@test.com",
        dependencia: "Ingenieria",
        cargo: "Contratista",
        ingresoP: "Ayer",
        extension: "12345",
        perfil: "Admin",
        variables: [{ nombre: "agua" }, { nombre: "Gas" }, { nombre: "perro" }]
      },
      {
        id: "2",
        nombre: "Felipe",
        correo: "test@test.com",
        dependencia: "Ingenieria",
        cargo: "Contratista",
        ingresoP: "Ayer",
        extension: "12345",
        perfil: "Admin",
        variables: [
          { nombre: "agua" },
          { nombre: "gato" },
          { nombre: "Viento" },
          { nombre: "Luz" }
        ]
      },
      {
        id: "3",
        nombre: "Vanesa",
        correo: "test@test.com",
        dependencia: "Ingenieria",
        cargo: "Contratista",
        ingresoP: "Ayer",
        extension: "12345",
        perfil: "Admin",
        variables: [
          { nombre: "agua" },
          { nombre: "casa" },
          { nombre: "Viento" }
        ]
      },
      {
        id: "4",
        nombre: "Pedro",
        correo: "test@test.com",
        dependencia: "Ingenieria",
        cargo: "Contratista",
        ingresoP: "Ayer",
        extension: "12345",
        perfil: "Admin",
        variables: [
          { nombre: "agua" },
          { nombre: "horno" },
          { nombre: "Viento" }
        ]
      },
      {
        id: "5",
        nombre: "Carlos",
        correo: "test@test.com",
        dependencia: "Ingenieria",
        cargo: "Contratista",
        ingresoP: "Ayer",
        extension: "12345",
        perfil: "Admin",
        variables: [{ nombre: "agua" }, { nombre: "Gas" }, { nombre: "Viento" }]
      }
    ],
    idUser: null,
    varInfo: false
  };

  handleClick = id => {
    this.setState({ idUser: id, varInfo: true });
  };

  aux = () => {
    if (this.state.idUser != null) {
      for (let user in this.state.users) {
        if (this.state.users[user].id === this.state.idUser) {
          return this.state.users[user].variables;
        }
      }
    }
  };

  render() {
    //console.log(this.state.postres)

    return (
      <div className={styles.Users}>
        <div className={styles.Title}>Usuarios</div>
        <div className={styles.TableContainer}>
          <div className={styles.TableUsers}>
            <TablaUsuarios
              users={this.state.users}
              clickedUser={this.handleClick}
            />
          </div>
          <div className={styles.TableUserVar}>
            <TablaVariables data={this.aux()} />
          </div>
        </div>
      </div>
    );
  }
}

export default Usuarios;
