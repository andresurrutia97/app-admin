import React from "react";
import styles from "./Sidebar.module.scss";
import Backdrop from "../../UI/Backdrop/Backdrop";
import campusLogo from "../../../Assets/imgs/logoCampus.png";
import Items from "./Items/Items";
import { routes } from "../Routes/Routes";

const Sidebar = props => {
  let attachedClasses = [styles.Sidebar, styles.Close];
  if (props.open) {
    attachedClasses = [styles.Sidebar, styles.Open];
    console.log("open sidebar");
  }
  return (
    <React.Fragment>
      <Backdrop show={props.open} close={props.closed} />
      <div className={attachedClasses.join(" ")}>
        <div className={styles.Logo}>
          <img src={campusLogo} alt="Campus Sostenible"></img>
        </div>
        <hr
          style={{
            width: "85%",
            backgroundColor: "#ccc",
            border: "none",
            height: "1px"
          }}
        />
        <Items routes={routes} />
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
