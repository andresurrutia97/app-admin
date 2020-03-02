import React, { Component } from "react";

import styles from "./Usuarios.module.scss";
import TablaUsuarios from "../../Components/Tablas/Usuarios/Usuarios";

export class Usuarios extends Component {
  state = {
    postres: [
      {
        nombre: "Pastel",
        cal: 3,
        fat: 34
      },
      {
        nombre: "Pastel2",
        cal: 3,
        fat: 34
      }
    ],
    users: [
      {
        nombre: "andres",
        correo: "test@test.com",
        dependencia: "Ingenieria",
        cargo: "Contratista",
        ingresoP: "Ayer",
        extension: "12345",
        perfil: "Admin"
      },
      {
        nombre: "andres",
        correo: "test@test.com",
        dependencia: "Ingenieria",
        cargo: "Contratista",
        ingresoP: "Ayer",
        extension: "12345",
        perfil: "Admin"
      },
      {
        nombre: "andres",
        correo: "test@test.com",
        dependencia: "Ingenieria",
        cargo: "Contratista",
        ingresoP: "Ayer",
        extension: "12345",
        perfil: "Admin"
      },
      {
        nombre: "andres",
        correo: "test@test.com",
        dependencia: "Ingenieria",
        cargo: "Contratista",
        ingresoP: "Ayer",
        extension: "12345",
        perfil: "Admin"
      },
      {
        nombre: "andres",
        correo: "test@test.com",
        dependencia: "Ingenieria",
        cargo: "Contratista",
        ingresoP: "Ayer",
        extension: "12345",
        perfil: "Admin"
      },
      {
        nombre: "andres",
        correo: "test@test.com",
        dependencia: "Ingenieria",
        cargo: "Contratista",
        ingresoP: "Ayer",
        extension: "12345",
        perfil: "Admin"
      },
      {
        nombre: "andres",
        correo: "test@test.com",
        dependencia: "Ingenieria",
        cargo: "Contratista",
        ingresoP: "Ayer",
        extension: "12345",
        perfil: "Admin"
      }
    ]
  };

  render() {
    //console.log(this.state.postres)
    return (
      <div className={styles.Users}>
        <div className={styles.Title}>Usuarios</div>
        <TablaUsuarios users={this.state.users} />
      </div>
    );
  }
}

export default Usuarios;
