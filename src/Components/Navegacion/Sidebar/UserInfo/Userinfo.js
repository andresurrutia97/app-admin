import React from "react";
import styles from "./Userinfo.module.scss";

const Userinfo = () => {
  const truncateName = str => {
    return str.length > 28 ? str.substring(0, 25) + "..." : str;
  };
  const truncateEmail = str => {
    return str.length > 25 ? str.substring(0, 23) + "..." : str;
  };
  return (
    <div className={styles.Userinfo}>
      <div className={styles.Info}>
        <div className={styles.Info_nombre}>
          {truncateName("Andres Felipe Urrutia Solarte")}
        </div>
        <div className={styles.Info_correo}>
          {truncateEmail("andres.urrutia@uao.edu.co")}
        </div>
      </div>
      <div className={styles.Icon}>
        <i className="material-icons-outlined" style={{ fontSize: "20px" }}>
          exit_to_app
        </i>
      </div>
    </div>
  );
};

export default Userinfo;
