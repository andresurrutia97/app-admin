import React, { Component } from "react";
import styles from "./Layout.module.scss";

import Sidebar from "../../Components/Navegacion/Sidebar/Sidebar";
import Toolbar from "../../Components/Navegacion/Toolbar/Toolbar";

export class Layout extends Component {
  state = {
    showSidebar: false
  };

  sideDraweOpenedHandler = () => {
    this.setState(prevState => {
      return { showSidebar: !prevState.showSidebar };
    });
  };

  sideDraweClosedHandler = () => {
    this.setState({ showSidebar: false });
  };

  render() {
    return (
      <div className={styles.Layout}>
        <div className={styles.SidebarContainer}>
          <Sidebar
            clasName={styles.Sidebar}
            closed={this.sideDraweClosedHandler}
            open={this.state.showSidebar}
          />
        </div>
 
          <Toolbar open={this.sideDraweOpenedHandler} />


        <div className={styles.Contenido}>
          <div className={styles.Main}>{this.props.children}</div>
          {/* <div className={styles.Footer}>Footer</div> */}
        </div>
      </div>
    );
  }
}

export default Layout;
