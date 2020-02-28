import React from "react";
import styles from "./Userinfo.module.scss";

const Userinfo = () => {
  return (
    <div className={styles.Userinfo}>
      <div className={styles.Info}>
        <div className={styles.Info_nombre}>Andres Felipe Urrutia</div>
        <div className={styles.Info_correo}>afurrutia@uao.edu.co</div>
      </div>
      <div className={styles.Icon}>
        <i className="material-icons-outlined" style={{ fontSize: "24px" }}>
          exit_to_app
        </i>
      </div>
    </div>
  );
};

export default Userinfo;
