import React, { Component } from "react";
import styles from "./Layout.module.scss";

import Sidebar from "../../Components/Navegacion/Sidebar/Sidebar";
import Toolbar from "../../Components/Navegacion/Toolbar/Toolbar";

export class Layout extends Component {
  state = {
    showSidebar: false
  };

  //Controlador de sidebar - abrir
  sidebarOpenedHandler = () => {
    this.setState(prevState => {
      return { showSidebar: !prevState.showSidebar };
    });
  };
  //Controlador de sidebar - cerrar
  sidebarClosedHandler = () => {
    this.setState({ showSidebar: false });
  };

  render() {
    return (
      <div className={styles.Layout}>
        <div className={styles.SidebarContainer}>
          <Sidebar
            clasName={styles.Sidebar}
            closed={this.sidebarClosedHandler}
            open={this.state.showSidebar}
          />
        </div>

        <Toolbar open={this.sidebarOpenedHandler} />

        <div className={styles.Content}>
          <div className={styles.Main}>{this.props.children}</div>
          {/* <div className={styles.Footer}>Footer</div> */}
        </div>
      </div>
    );
  }
}

export default Layout;
